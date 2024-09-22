import supabaseClient, { supabaseUrl } from "../utils/supabase-client";

export async function applyToJob(token: string, payload: { jobData: any }) {
    const supabase = await supabaseClient(token);
    const { jobData } = payload

    const random = Math.floor(Math.random() * 900000)
    const fileName = `resume-${random}-${jobData?.candidateId}`

    const { error: storageError } = await supabase.storage.from("resume").upload(fileName, jobData?.resume)

    if (storageError) {
        console.error("Error while uploading resume", storageError);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes`


    const { data, error } = await supabase.
        from("applications").
        insert([{ ...jobData, resume }]).
        select();

    if (error) {
        console.error("Error while applying to job", error);
        return null;
    }

    return data;

}