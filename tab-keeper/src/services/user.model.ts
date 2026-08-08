import { Profile } from "../model/profile.model";
import { supabase } from "../utils/createClient";


export async function getProfileByCode(code: string) : Promise<Profile> {
    const {data, error} = await supabase.rpc('get_profile_by_code', {
        code: code
    })

    if (error) { throw error }

    return {
        id: data.id,
        name: data.name,
        createdAt: data.created_at,
        role: data.role,
    };
} 