import supabaseClient from "../utils/supabase-client";

export async function getCompanies(token: string) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("companies").select("*")

    if (error) {
        console.error("Error while fetching companies", error);
        return null;
    }

    return data;
}