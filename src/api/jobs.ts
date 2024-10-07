import moment from "moment";
import supabaseClient from "../utils/supabase-client";
export interface IGetJobPayload {
  title?: string
  location?: string,
  company_id?: string,
  created_at?: Date
  is_open?: "yes" | "no",
  recruiter_id?: string
}

export async function getJobs(token: string, payload: IGetJobPayload) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").select("*, company:companies(name, logo_url), applications: applications(*), saved: saved_jobs(job_id)")


  if (payload?.location) {
    query = query.eq("location", payload?.location)
  }
  if (payload?.company_id) {
    query = query.eq("company_id", payload?.company_id)
  }
  if (payload?.recruiter_id) {
    query = query.eq("recruiter_id", payload?.recruiter_id)
  }
  if (payload?.is_open) {
    query = query.eq("is_open", payload?.is_open === "yes" ? true : false)
  }
  if (payload?.created_at) {
    query = query.gte("created_at", moment(new Date(payload.created_at)).format('YYYY-MM-DDTHH:mm:ssZ')).lte("created_at", moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ'));
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
    const { data, error: unBookmarkError } = await supabase.from("saved_jobs").delete().eq("job_id", payload?.jobId)
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

export async function getJob(token: string, payload: { id: string }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.
    from("jobs").
    select("*, company:companies(name, logo_url), applications: applications(*)").
    eq("id", payload?.id).
    single()

  if (error) {
    console.error("Error while fetching job", error);
    return null;
  }

  return data;

}

export async function updateJob(token: string, payload: { id: string, isOpen: boolean }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.
    from("jobs").
    update({ is_open: payload?.isOpen }).
    eq("id", payload?.id).single()

  if (error) {
    console.error("Error while updating job", error);
    return null;
  }

  return data;

}

export async function addNewJob(token: string, payload: any) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.
    from("jobs").
    insert([payload]).
    select()

  if (error) {
    console.error("Error while creating job", error);
    return null;
  }
  return data;

}
