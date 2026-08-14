import { useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useProfileViewModel } from "../viewmodels/profile.viewmodel";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";

export default function AccessView({
    error,
    code,
    getProfile,
    HandleCodeChange,
}: ReturnType<typeof useProfileViewModel>) {
    const inputRefs = useRef<(TextInput | null)[]>([]);

    return (
        <View style={styles.background}>
            <Text style={styles.title}>
                Inserir o código de acesso
            </Text>

            <View style={styles.codeContainer}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            inputRefs.current[index] = ref;
                        }}
                        value={code[index] ?? ""}
                        onChangeText={(value) => {
                            const nextIndex = HandleCodeChange(value, index);

                            if (value && index < 3) {
                                inputRefs.current[index + 1]?.focus();
                            }
                        }}
                        maxLength={1}
                        style={styles.codeInput}
                    />
                ))}
            </View>

            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}

            <TouchableOpacity
                style={styles.button}
                onPress={() => getProfile(code.trim())}
            >
                <Text style={styles.buttonText}>
                    CONFIRMAR
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: COLORS.textPrimary,
        fontSize: wp("4.5%"),
        fontWeight: "600",
        marginBottom: hp("2%"),
    },

    codeContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: wp("6.5%"),
        marginBottom: hp("1%"),
    },

    codeInput: {
        width: wp("15%"),
        height: wp("15%"),
        borderWidth: 2,
        borderColor: COLORS.gold,
        borderRadius: wp("2%"),
        backgroundColor: COLORS.surface,
        color: COLORS.textPrimary,
        textAlign: "center",
        fontSize: wp("6%"),
        fontWeight: "600",
    },

    errorText: {
        color: "#FF5555",
        fontSize: wp("3.5%"),
        marginBottom: hp("2%"),
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        width: wp("80%"),
        padding: hp("2%"),
        borderRadius: wp("1%"),
    },

    buttonText: {
        fontSize: wp("4%"),
        fontWeight: "500",
        color: COLORS.background,
    },
});