import supabaseClient from "../utils/supabase-client";
interface IGetJobPayload {
  location?: string,
  companyId?: string,
  title?: string
}

export async function getJobs(token: string, payload: IGetJobPayload) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").select("*, company:companies(name, logo_url)")

  if (payload?.location) {
    query = query.eq("location", payload?.location)
  }
  if (payload?.companyId) {
    query = query.eq("company_id", payload?.companyId)
  }
  if (payload?.title) {
    query = query.ilike("title", `%${payload?.title}%`)
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error while fetching jobs", error);
    return null;
  }

  return data;
}

export interface IBookmarkJobPayload {
  alreadyBookmarked?: boolean,
  userId: string,
  jobId: string
}

export async function bookmarkJob(token: string, payload: IBookmarkJobPayload) {
  const supabase = await supabaseClient(token);

  if (payload.alreadyBookmarked) {
    const { data, error: unBookmarkError } = await supabase.from("saved_jobs").delete().eq("job_id", payload?.job_id)
    if (unBookmarkError) {
      console.log("Error in unbookmark Jobs", unBookmarkError)
      return null;
    }
    return data
  } else {
    delete payload?.alreadyBookmarked
    const { data, error: bookmarkError } = await supabase.from("saved_jobs").insert([payload]).select()
    if (bookmarkError) {
      console.log("Error in bookmark Jobs", bookmarkError)
      return null;
    }
    return data
  }
}
