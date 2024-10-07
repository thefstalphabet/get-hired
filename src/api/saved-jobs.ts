import supabaseClient from "../utils/supabase-client";

export async function getSavedJobs(token: string, payload: { id: string }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.
        from("saved_jobs").
        select("*").
        eq("user_id", payload?.id)

    if (error) {
        console.error("Error while fetching job", error);
        return null;
    }

    return data
}