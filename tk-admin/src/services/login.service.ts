import { supabase } from "../utils/createClient";

export async function singIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw error

    return data.session
}



export async function singOut() {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
}