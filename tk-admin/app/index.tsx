import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";

import { COLORS } from "@/src/constants/Color";
import { singIn } from "@/src/services/login.service";
import { getEmail, getPassword } from "@/src/services/storage.service";

export default function Index() {
    useEffect(() => {
        async function checkSession() {
            const email = await getEmail();
            const password = await getPassword();

            if (email && password) {
                try {
                    await singIn(email, password);
                    router.replace("/profiles");
                } catch {
                    router.replace("/login");
                }
            } else {
                router.replace("/login");
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
