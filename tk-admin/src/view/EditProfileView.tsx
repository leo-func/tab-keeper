import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";

import {
    User,
    Save,
    Trash2,
} from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/Color";
import { Header } from "../components/Header";
import { useEditProfile } from "../hooks/useEditProfile";

export default function EditProfileView({profileId, onBack}: {profileId: string; onBack: () => void}) {
    const {
        name,
        setName,
        loading,
        error,
        HandleUpdate,
        HandleDelete,
    } = useEditProfile(profileId);

    function handleDeletePress() {
        Alert.alert(
            "Excluir perfil",
            "Tem certeza que deseja excluir este perfil?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        await HandleDelete();
                        onBack;
                    },
                },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="EDITAR PERFIL"
                    showBackButton
                    onBackPress={onBack}
                />

                {/* NOME */}
                <Text style={styles.label}>
                    NOME
                </Text>

                <View style={styles.inputContainer}>
                    <User
                        size={wp("5%")}
                        color={COLORS.gold}
                        strokeWidth={1.8}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do perfil"
                        placeholderTextColor={COLORS.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {error ? (
                    <Text style={styles.errorText}>
                        {error.message}
                    </Text>
                ) : null}

                <View style={styles.spacer} />

                {/* BOTÃO SALVAR */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.saveButton, loading && styles.buttonDisabled]}
                    disabled={loading}
                    onPress={HandleUpdate}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.background} />
                    ) : (
                        <Save
                            size={wp("5%")}
                            color={COLORS.background}
                            strokeWidth={2}
                        />
                    )}

                    <Text style={styles.saveButtonText}>
                        {loading ? "SALVANDO..." : "SALVAR"}
                    </Text>
                </TouchableOpacity>

                {/* BOTÃO EXCLUIR */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.deleteButton, loading && styles.buttonDisabled]}
                    disabled={loading}
                    onPress={handleDeletePress}
                >
                    <Trash2
                        size={wp("5%")}
                        color={COLORS.danger}
                        strokeWidth={2}
                    />

                    <Text style={styles.deleteButtonText}>
                        EXCLUIR PERFIL
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    container: {
        flex: 1,
        paddingHorizontal: wp("5%"),
    },

    label: {
        color: COLORS.gold,
        fontSize: wp("3.5%"),
        fontWeight: "600",
        letterSpacing: 0.5,
        marginBottom: hp("1%"),
        marginTop: hp("2%"),
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingHorizontal: wp("4%"),
        height: hp("7%"),
        gap: wp("3%"),
    },

    input: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: wp("3.8%"),
    },

    errorText: {
        color: COLORS.danger,
        fontSize: wp("3.5%"),
        marginTop: hp("1%"),
    },

    spacer: {
        flex: 1,
    },

    saveButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        height: hp("7%"),
        borderRadius: wp("2%"),
        marginBottom: hp("1.5%"),
        gap: wp("2.5%"),
    },

    deleteButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.danger,
        height: hp("7%"),
        borderRadius: wp("2%"),
        marginBottom: hp("2%"),
        gap: wp("2.5%"),
    },

    buttonDisabled: {
        opacity: 0.6,
    },

    saveButtonText: {
        color: COLORS.background,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    deleteButtonText: {
        color: COLORS.danger,
        fontSize: wp("4%"),
        fontWeight: "600",
    },
});
