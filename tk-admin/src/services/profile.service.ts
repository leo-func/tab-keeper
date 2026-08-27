import { Profile } from "../model/Profile";
import { supabase } from "../utils/createClient";

export async function GetProfiles(page: number) : Promise<Profile[]> {
    const {data, error} = await supabase.rpc("get_profiles", {
        page: page
    }) 

    if (error) throw error

    return data.map((item: Profile) => ({
        id: item.id,
        name: item.name,
        access_token: item.access_token,
        created_at: item.created_at
    }))
}

export async function InsertNewProfile(name: string, role: string): Promise<Profile> {
    const {data, error} = await supabase.rpc("insert_new_profile", {
        name: name,
        role: role
    })

    if (error) throw error


    return {
        id: data[0].id,
        name: data[0].name,
        access_token: data[0].access_token,
        created_at: data[0].created_at
    }
}

export async function UpdateProfile(profileId: string, newName: string) {
    const {error} = await supabase.rpc("update_profile", {
        p_id: profileId,
        new_name: newName
    })

    if (error) throw error
}

export async function DeleteProfile(profileId: string) {
    const {error} = await supabase.rpc("delete_profile", {
        p_id: profileId,
    })

    if (error) throw error
}