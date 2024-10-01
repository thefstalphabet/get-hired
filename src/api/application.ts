import supabaseClient, { supabaseUrl } from "../utils/supabase-client";

export async function applyToJob(token: string, payload: any) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 900000)
    const fileName = `resume-${random}-${payload?.candidate_id}`

    const { error: storageError } = await supabase.storage.from("resumes").upload(fileName, payload?.resume)

    if (storageError) {
        console.error("Error while uploading resume", storageError);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`


    const { data, error } = await supabase.
        from("applications").
        insert([{ ...payload, resume }]).
        select();

    if (error) {
        console.error("Error while applying to job", error);
        return null;
    }

    return data;

}

export async function updateApplication(token: string, payload: { job_id: string, status: number }) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.
        from("applications").
        update({ status: payload?.status }).
        eq("job_id", payload?.job_id).
        select();

    if (error || data.length === 0) {
        console.error("Error updating application status", error);
        return null;
    }

    return data;

}