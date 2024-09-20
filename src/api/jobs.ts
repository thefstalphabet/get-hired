import supabaseClient from "../utils/supabase-client";
export async function getJobs(token: string, payload: {
  location?: string,
  company_id?: string,
  searchQuery?: string
}) {
  const supabase = await supabaseClient(token);

  let query = supabase.from("jobs").select("*, company:companies(name, logo_url)")

  if (payload?.location) {
    query = query.eq("location", payload?.location)
  }
  if (payload?.company_id) {
    query = query.eq("company_id", payload?.company_id)
  }
  if (payload?.searchQuery) {
    query = query.eq("title", `%${payload?.searchQuery}%`)
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error while fetching jobs", error);
    return null;
  }

  return data;
}

export async function bookmarkJob(token: string, payload: { alreadyBookmarked?: boolean }, saveData: any) {
  const supabase = await supabaseClient(token);
  if (payload.alreadyBookmarked) {
    const { data, error: unBookmarkError } = await supabase.from("saved_jobs").delete().eq("job_id", saveData?.job_id)
    if (unBookmarkError) {
      console.log("Error in unbookmark Jobs", unBookmarkError)
      return null;
    }
    return data
  } else {
    const { data, error: bookmarkError } = await supabase.from("saved_jobs").insert([saveData]).select()
    if (bookmarkError) {
      console.log("Error in bookmark Jobs", bookmarkError)
      return null;
    }
    return data
  }
}
