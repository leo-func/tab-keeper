import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import {
    Package,
    PackagePlus,
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
import { useNewProduct } from "../hooks/useNewProduct";

export default function CreateProductView() {
    const {
        name,
        setName,
        price,
        handlePriceChange,
        loading,
        error,
        HandleNewProduct,
        createdProduct,
        onDismissCreated,
    } = useNewProduct();

    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="NOVO PRODUTO"
                    showBackButton
                    onBackPress={() => router.back()}
                />

                {/* NOME */}
                <Text style={styles.label}>
                    NOME
                </Text>

                <View style={styles.inputContainer}>
                    <Package
                        size={wp("5%")}
                        color={COLORS.gold}
                        strokeWidth={1.8}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do produto"
                        placeholderTextColor={COLORS.textMuted}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                {/* PREÇO */}
                <Text style={styles.label}>
                    PREÇO
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.currencySymbol}>R$</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="0,00"
                        placeholderTextColor={COLORS.textMuted}
                        value={price}
                        onChangeText={handlePriceChange}
                        keyboardType="numeric"
                    />
                </View>

                {error ? (
                    <Text style={styles.errorText}>
                        {error}
                    </Text>
                ) : null}

                <View style={styles.spacer} />

                {/* BOTÃO CRIAR */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.createButton, loading && styles.createButtonDisabled]}
                    disabled={loading}
                    onPress={HandleNewProduct}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color={COLORS.background} />
                    ) : (
                        <PackagePlus
                            size={wp("5%")}
                            color={COLORS.background}
                            strokeWidth={2}
                        />
                    )}

                    <Text style={styles.createButtonText}>
                        {loading ? "CRIANDO..." : "CRIAR PRODUTO"}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* MODAL CONFIRMAÇÃO CRIAÇÃO */}
            <ConfirmModal
                visible={!!createdProduct}
                title="Produto criado!"
                info={[
                    { label: "Nome", value: createdProduct?.name ?? "" },
                    { label: "Preço", value: `R$ ${createdProduct?.price.toFixed(2).replace(".", ",")}` ?? "" },
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

    currencySymbol: {
        color: COLORS.gold,
        fontSize: wp("4%"),
        fontWeight: "600",
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
