import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveCredentials(email: string, password: string): Promise<void> {
    await AsyncStorage.multiSet([
        ["email", email],
        ["password", password],
    ]);
}

export async function getEmail(): Promise<string | null> {
    return await AsyncStorage.getItem("email");
}

export async function getPassword(): Promise<string | null> {
    return await AsyncStorage.getItem("password");
}

export async function removeCredentials(): Promise<void> {
    await AsyncStorage.multiRemove(["email", "password"]);
}
