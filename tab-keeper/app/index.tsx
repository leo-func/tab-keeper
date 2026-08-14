import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import { getProfileId, removeProfileSession } from "@/src/services/storage.service";
import { COLORS } from "@/src/constants/Color";

export default function Index() {
    useEffect(() => {
        async function checkSession() {
            const profileId = await getProfileId();

            if (profileId) {
                router.replace("/bills");
            } else {
                router.replace("/login")
            }
        }

        checkSession();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.background,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <ActivityIndicator
                size="large"
                color={COLORS.gold}
            />
        </View>
    );
}