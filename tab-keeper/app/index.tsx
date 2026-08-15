import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import { getCode, removeProfileSession } from "@/src/services/storage.service";
import { COLORS } from "@/src/constants/Color";
import { supabase } from "@/src/utils/createClient";
import {
    createAnonymousSession,
    connectProfileByCode,
} from "@/src/services/profile.service";

export default function Index() {
    useEffect(() => {
        async function checkSession() {
            const code = await getCode();

            if (code) {
                const { data } = await supabase.auth.getSession();

                if (!data.session) {
                    await createAnonymousSession()
                }
                

                await connectProfileByCode(code)

                router.replace("/bills");

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