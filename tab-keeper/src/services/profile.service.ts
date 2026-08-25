import { Profile } from "../model/profile.model";
import { supabase } from "../utils/createClient";


export async function connectProfileByCode(code: string) : Promise<Profile | null> {
    const {data, error} = await supabase.rpc('connect_profile_by_code', {
        code: code
    })

    if (error) { throw error }

    console.log(data)

    return {
        id: data[0].id,
        name: data[0].name,
        createdAt: data[0].created_at,
        role: data[0].role,
    };
} 

export async function createAnonymousSession() {
    const { data, error } = await supabase.auth.signInAnonymously();

    if (error) {
        throw error;
    }


    return data.session;
}

export async function logout() {
    const { data, error } = await supabase.rpc("disconnect_profile");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
        throw error
    }
}