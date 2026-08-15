import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../utils/createClient";

export async function saveProfileSession(code: string) : Promise<void> {
    await AsyncStorage.multiSet([
        ["code", code.toLowerCase()]
    ])
}

export async function getProfileId() : Promise<string | null> {
    return await AsyncStorage.getItem("profileId")
}

export async function getCode() : Promise<string | null> {
    return await AsyncStorage.getItem("code")
}

export async function removeProfileSession() {
    await AsyncStorage.multiRemove(["profileId", "code"])
    await supabase.auth.signOut()
}
