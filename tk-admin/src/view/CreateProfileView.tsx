import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import {
    User,
    UserPlus,
} from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/Color";
import { Header } from "../components/Header";
import { ConfirmModal } from "../components/ConfirmModal";
import { useProfileViewModel } from "../viewmodels/profile.viewmodel";
import { useEffect } from "react";

export default function CreateProfileView({
    name,
    setName,
    createLoading,
    createError,
    handleCreate,
    createdProfile,
    onDismissCreated,
    onBack
}: ReturnType<typeof useProfileViewModel> & {onBack: () => void}) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="NOVO USUÁRIO"
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
                        placeholder="Digite o nome do usuário"
                        placeholderTextColor={COLORS.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {createError ? (
                    <Text style={styles.errorText}>
                        {createError}
                    </Text>
                ) : null}

                <View style={styles.spacer} />

                {/* BOTÃO CRIAR */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.createButton, createLoading && styles.createButtonDisabled]}
                    disabled={createLoading}
                    onPress={handleCreate}
                >
                    {createLoading ? (
                        <ActivityIndicator size="small" color={COLORS.background} />
                    ) : (
                        <UserPlus
                            size={wp("5%")}
                            color={COLORS.background}
                            strokeWidth={2}
                        />
                    )}

                    <Text style={styles.createButtonText}>
                        {createLoading ? "CRIANDO..." : "CRIAR USUÁRIO"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* MODAL CONFIRMAÇÃO CRIAÇÃO */}
            <ConfirmModal
                visible={!!createdProfile}
                title="Usuário criado!"
                info={[
                    { label: "Nome", value: createdProfile?.name ?? "" },
                    { label: "Código de acesso", value: createdProfile?.access_token ?? "" },
                ]}
                onClose={onDismissCreated}
            />
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

    // LABELS

    label: {
        color: COLORS.gold,
        fontSize: wp("3.5%"),
        fontWeight: "600",
        letterSpacing: 0.5,
        marginBottom: hp("1%"),
        marginTop: hp("2%"),
    },

    // INPUT

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

    // ERROR

    errorText: {
        color: COLORS.danger,
        fontSize: wp("3.5%"),
        marginTop: hp("1%"),
    },

    // SPACER

    spacer: {
        flex: 1,
    },

    // CREATE BUTTON

    createButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        height: hp("7%"),
        borderRadius: wp("2%"),
        marginBottom: hp("2%"),
        gap: wp("2.5%"),
    },

    createButtonDisabled: {
        opacity: 0.6,
    },

    createButtonText: {
        color: COLORS.background,
        fontSize: wp("4%"),
        fontWeight: "600",
    },
});
