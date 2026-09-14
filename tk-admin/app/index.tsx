import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { router } from "expo-router";
import * as Updates from 'expo-updates'

import { COLORS } from "@/src/constants/Color";
import { singIn } from "@/src/services/login.service";
import { getEmail, getPassword } from "@/src/services/storage.service";

export default function Index() {
    useEffect(() => {
        async function onFetchUpdateAsync() {
            if (__DEV__) {
                console.log("Ambiente de desenvolvimento. Função de atualização automatica desativada.")
                return
            }
            
            try {
                const update = await Updates.checkForUpdateAsync()

                if (update.isAvailable) {
                    await Updates.fetchUpdateAsync()
                    await Updates.reloadAsync()
                }
            } catch (exception) {
                console.log(`Erro ao buscar atualização: ${exception}`)
            }
        }

        onFetchUpdateAsync()
    }, [])

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
