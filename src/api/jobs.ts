import supabaseClient from "../utils/supabase-client";

export async function getJobs(token: string) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("jobs").select("*");

  if (error) {
    console.error("Error while fetching jobs", error);
    return null;
  }

  return data;
}
