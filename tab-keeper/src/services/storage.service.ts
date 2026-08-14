import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveProfileSession(profileId: string, code: string) : Promise<void> {
    await AsyncStorage.multiSet([
        ["profileId", profileId],
        ["code", code]
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
}
