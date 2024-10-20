import supabaseClient, { supabaseUrl } from "../utils/supabase-client";

export async function getCompanies(token: string) {
    const supabase = await supabaseClient(token);

    const { data, error } = await supabase.from("companies").select("*")

    if (error) {
        console.error("Error while fetching companies", error);
        return null;
    }

    return data;
}

export async function createCompany(token: string, payload: { logo: File, name: string }) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 900000)
    const logoName = `copmany-logo-${random}-${payload?.name}`

    const { error: storageError } = await supabase.storage.from("company-logo").upload(logoName, payload?.logo)

    if (storageError) {
        console.error("Error while uploading logo", storageError);
        return null;
    }

    const logoUrl = `${supabaseUrl}/storage/v1/object/public/company-logo/${logoName}`

    const { data, error } = await supabase.
        from("companies").
        insert([{ name: payload?.name, logo_url: logoUrl }]).
        select();

    if (error) {
        console.error("Error while creating company", error);
        return null;
    }

    return data;

}