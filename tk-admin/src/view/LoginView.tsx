import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useLoginViewModel } from "../viewmodels/login.viewmodel";
import { COLORS } from "../constants/Color";

export default function LoginView({
    email,
    password,
    setEmail,
    setPassword,
    loading,
    error,
    HandleLogin,
}: ReturnType<typeof useLoginViewModel>) {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>
                Tab Keeper Admin
            </Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor={COLORS.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                placeholderTextColor={COLORS.textMuted}
                secureTextEntry
                style={styles.input}
            />

            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                disabled={loading}
                onPress={() => HandleLogin(email.trim(), password)}
            >
                <Text style={styles.buttonText}>
                    {loading ? "ENTRANDO..." : "ENTRAR"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.background,
        gap: hp("1.5%"),
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: COLORS.textPrimary,
        fontSize: wp("6%"),
        fontWeight: "600",
        marginBottom: hp("2%"),
    },

    input: {
        width: wp("80%"),
        padding: hp("2%"),
        borderWidth: 2,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        backgroundColor: COLORS.surface,
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
    },

    errorText: {
        color: COLORS.danger,
        fontSize: wp("3.5%"),
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        width: wp("80%"),
        padding: hp("2%"),
        borderRadius: wp("2%"),
        marginTop: hp("1%"),
    },

    buttonText: {
        fontSize: wp("4%"),
        fontWeight: "500",
        color: COLORS.background,
    },

    buttonDisabled: {
        opacity: 0.6,
    },
});
