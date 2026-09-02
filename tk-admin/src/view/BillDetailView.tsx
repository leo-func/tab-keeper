import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    TextInput,
} from "react-native";

import {
    ReceiptText,
    PackagePlus,
    Trash2,
    LockKeyhole,
    LockOpen,
    Search,
    ChevronDown,
    Plus,
    Minus,
    X,
} from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/Color";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";
import { ConfirmModal } from "../components/ConfirmModal";
import { useBillDetailViewModel } from "../viewmodels/billDetail.viewmodel";

export default function BillDetailView({
    
    // Props from ViewModel
    billProducts,
    billProductsError,
    billProductsLoading,
    loadNextPage,
    products,
    productsLoading,
    showAddProduct,
    selectedProduct,
    quantity,
    searchText,
    isComboBoxOpen,
    addProductLoading,
    addProductError,
    showSuccessModal,
    isClosed,
    handleOpenAddProduct,
    handleCancelAddProduct,
    handleSelectProduct,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleAddProduct,
    handleDeleteBillProduct,
    handleCloseBill,
    handleOpenBill,
    handleDeleteBill,
    onDismissSuccessModal,
    setSearchText,
    setIsComboBoxOpen,
    
    // Props from router
    billName,
    billTotalCount,
    billTotal,
    billClosedAt,
    onBack

} : ReturnType<typeof useBillDetailViewModel> & {billName: string, billTotal: number, billTotalCount: number, billClosedAt: string, onBack: () => void}) {


    function onCloseBillConfirm() {
        Alert.alert(
            "Fechar conta",
            "Tem certeza que deseja fechar esta conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Fechar",
                    style: "destructive",
                    onPress: handleCloseBill,
                },
            ]
        );
    }

    function onDeleteBillConfirm() {
        Alert.alert(
            "Excluir conta",
            "Tem certeza que deseja excluir esta conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: handleDeleteBill,
                },
            ]
        );
    }

    function onOpenBillConfirm() {
        Alert.alert(
            "Abrir conta",
            "Tem certeza que deseja abrir esta conta?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Abrir",
                    style: "destructive",
                    onPress: handleOpenBill,
                },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="DETALHES DA CONTA"
                    showBackButton
                    onBackPress={onBack}
                />

                {showAddProduct ? (
                    <FlatList
                        data={[]}
                        keyExtractor={() => "dummy"}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View>
                                {/* BILL INFO CARD */}
                                <View style={styles.billInfoCard}>
                                    <View style={styles.billHeader}>
                                        <View style={styles.billIconContainer}>
                                            <ReceiptText
                                                size={wp("8%")}
                                                color={COLORS.gold}
                                                strokeWidth={1.8}
                                            />
                                        </View>
                                        <Text style={styles.billName}>{billName}</Text>
                                    </View>

                                    <View style={styles.billStats}>
                                        <View style={styles.statItem}>
                                            <Text style={styles.statValue}>{billTotalCount}</Text>
                                            <Text style={styles.statLabel}>Produtos</Text>
                                        </View>

                                        <View style={styles.statDivider} />

                                        <View style={styles.statItem}>
                                            <View style={[styles.statusBadge, isClosed && styles.statusClosed]}>
                                                <Text style={[styles.statusText, isClosed && styles.statusTextClosed]}>
                                                    {isClosed ? "Fechada" : "Aberta"}
                                                </Text>
                                            </View>
                                            <Text style={styles.statLabel}>Status</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* ADD PRODUCT SECTION */}
                                <View style={styles.addProductSection}>
                                    <Text style={styles.sectionTitle}>Selecionar produto</Text>

                                    <Text style={styles.label}>Produto</Text>

                                    {/* COMBO BOX */}
                                    <View style={styles.comboBoxContainer}>
                                        <TouchableOpacity
                                            style={styles.comboBox}
                                            activeOpacity={0.7}
                                            onPress={() => setIsComboBoxOpen(!isComboBoxOpen)}
                                        >
                                            <Search
                                                size={wp("4.5%")}
                                                color={COLORS.textMuted}
                                                strokeWidth={1.8}
                                            />
                                            <TextInput
                                                style={styles.comboBoxInput}
                                                placeholder="Buscar ou selecionar produto"
                                                placeholderTextColor={COLORS.textMuted}
                                                value={searchText}
                                                onChangeText={(text) => {
                                                    setSearchText(text)
                                                    setIsComboBoxOpen(true)
                                                }}
                                                onFocus={() => setIsComboBoxOpen(true)}
                                            />
                                            <ChevronDown
                                                size={wp("4.5%")}
                                                color={COLORS.textMuted}
                                                strokeWidth={1.8}
                                                style={[styles.comboBoxIcon, isComboBoxOpen && styles.comboBoxIconOpen]}
                                            />
                                        </TouchableOpacity>

                                        {isComboBoxOpen && (
                                            <View style={styles.comboBoxDropdown}>
                                                {productsLoading ? (
                                                    <View style={styles.comboBoxLoading}>
                                                        <ActivityIndicator size="small" color={COLORS.gold} />
                                                    </View>
                                                ) : (
                                                    <FlatList
                                                        data={products}
                                                        keyExtractor={(item) => item.id}
                                                        nestedScrollEnabled
                                                        showsVerticalScrollIndicator={false}
                                                        style={styles.comboBoxList}
                                                        renderItem={({ item }) => (
                                                            <TouchableOpacity
                                                                style={styles.comboBoxItem}
                                                                activeOpacity={0.7}
                                                                onPress={() => handleSelectProduct(item)}
                                                            >
                                                                <Text style={styles.comboBoxItemText}>
                                                                    {item.name}
                                                                </Text>
                                                                <Text style={styles.comboBoxItemPrice}>
                                                                    R$ {item.price.toFixed(2).replace(".", ",")}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        )}
                                                        ListEmptyComponent={
                                                            <Text style={styles.comboBoxEmptyText}>
                                                                Nenhum produto encontrado
                                                            </Text>
                                                        }
                                                    />
                                                )}
                                            </View>
                                        )}
                                    </View>

                                    {/* QUANTITY */}
                                    <Text style={styles.label}>Quantidade</Text>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            activeOpacity={0.7}
                                            onPress={handleDecrementQuantity}
                                        >
                                            <Minus
                                                size={wp("4.5%")}
                                                color={COLORS.gold}
                                                strokeWidth={1.8}
                                            />
                                        </TouchableOpacity>

                                        <Text style={styles.quantityValue}>{quantity}</Text>

                                        <TouchableOpacity
                                            style={styles.quantityButton}
                                            activeOpacity={0.7}
                                            onPress={handleIncrementQuantity}
                                        >
                                            <Plus
                                                size={wp("4.5%")}
                                                color={COLORS.gold}
                                                strokeWidth={1.8}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    {addProductError && (
                                        <Text style={styles.errorText}>{addProductError}</Text>
                                    )}

                                    {/* ADD BUTTON */}
                                    <TouchableOpacity
                                        style={[styles.addButton, addProductLoading && styles.addButtonDisabled]}
                                        activeOpacity={0.7}
                                        onPress={handleAddProduct}
                                        disabled={addProductLoading}
                                    >
                                        {addProductLoading ? (
                                            <ActivityIndicator size="small" color={COLORS.background} />
                                        ) : (
                                            <Plus
                                                size={wp("5%")}
                                                color={COLORS.background}
                                                strokeWidth={2}
                                            />
                                        )}
                                        <Text style={styles.addButtonText}>
                                            {addProductLoading ? "Adicionando..." : "Adicionar à conta"}
                                        </Text>
                                    </TouchableOpacity>

                                    {/* CANCEL BUTTON */}
                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        activeOpacity={0.7}
                                        onPress={handleCancelAddProduct}
                                    >
                                        <X
                                            size={wp("4.5%")}
                                            color={COLORS.textSecondary}
                                            strokeWidth={1.8}
                                        />
                                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
                ) : (
                    <View style={styles.contentContainer}>
                        {/* BILL INFO CARD */}
                        <View style={styles.billInfoCard}>
                            <View style={styles.billHeader}>
                                <View style={styles.billIconContainer}>
                                    <ReceiptText
                                        size={wp("8%")}
                                        color={COLORS.gold}
                                        strokeWidth={1.8}
                                    />
                                </View>
                                <Text style={styles.billName}>{billName}</Text>
                            </View>

                            <View style={styles.billStats}>
                                <View style={styles.statItem}>
                                    <Text style={styles.statValue}>{billTotalCount}</Text>
                                    <Text style={styles.statLabel}>Produtos</Text>
                                </View>

                                <View style={styles.statDivider} />

                                <View style={styles.statItem}>
                                    <View style={[styles.statusBadge, isClosed && styles.statusClosed]}>
                                        <Text style={[styles.statusText, isClosed && styles.statusTextClosed]}>
                                            {isClosed ? "Fechada" : "Aberta"}
                                        </Text>
                                    </View>
                                    <Text style={styles.statLabel}>Status</Text>
                                </View>
                            </View>
                        </View>

                        {/* ACTION BUTTONS */}
                        <View style={styles.actionsContainer}>
                            {isClosed ? (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    activeOpacity={0.7}
                                    onPress={onOpenBillConfirm}
                                >
                                    <LockOpen
                                        size={wp("6%")}
                                        color={COLORS.textPrimary}
                                        strokeWidth={1.8}
                                    />
                                    <Text style={styles.actionText}>Abrir Conta</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    activeOpacity={0.7}
                                    onPress={onCloseBillConfirm}
                                >
                                    <LockKeyhole
                                        size={wp("6%")}
                                        color={COLORS.textPrimary}
                                        strokeWidth={1.8}
                                    />
                                    <Text style={styles.actionText}>Fechar Conta</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={styles.actionButton}
                                activeOpacity={0.7}
                                onPress={handleOpenAddProduct}
                            >
                                <PackagePlus
                                    size={wp("6%")}
                                    color={COLORS.gold}
                                    strokeWidth={1.8}
                                />
                                <Text style={styles.actionText}>Adicionar Produto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.actionButton}
                                activeOpacity={0.7}
                                onPress={onDeleteBillConfirm}
                            >
                                <Trash2
                                    size={wp("6%")}
                                    color={COLORS.danger}
                                    strokeWidth={1.8}
                                />
                                <Text style={[styles.actionText, styles.deleteText]}>Excluir Conta</Text>
                            </TouchableOpacity>
                        </View>

                        {/* PRODUCTS SECTION */}
                        <Text style={styles.sectionTitle}>Produtos da conta</Text>

                        <FlatList
                            data={billProducts ?? []}
                            keyExtractor={(item) => item.id}
                            onEndReached={loadNextPage}
                            onEndReachedThreshold={0.1}
                            showsVerticalScrollIndicator={false}
                            style={styles.productsList}
                            renderItem={({ item }) => (
                                <ProductCard
                                    product={{ id: item.id, name: item.name ?? "Produto", price: item.total_price / item.amount }}
                                    subtitle={`${item.amount} unidades`}
                                    rightLabel={`R$ ${item.total_price.toFixed(2).replace(".", ",")}`}
                                    showChevron={false}
                                    onDelete={() => handleDeleteBillProduct(item.id)}
                                />
                            )}
                            ListFooterComponent={
                                billProductsLoading ? (
                                    <View style={styles.footerLoading}>
                                        <ActivityIndicator
                                            size="small"
                                            color={COLORS.gold}
                                        />
                                    </View>
                                ) : null
                            }
                            ListEmptyComponent={
                                !billProductsLoading ? (
                                    <View style={styles.emptyContainer}>
                                        <Text style={styles.emptyText}>
                                            Nenhum produto nesta conta
                                        </Text>
                                    </View>
                                ) : null
                            }
                        />
                    </View>
                )}
            </View>

            {/* TOTAL FOOTER - ALWAYS VISIBLE */}
            <View style={styles.totalFooter}>
                <View style={styles.totalIconContainer}>
                    <ReceiptText
                        size={wp("5%")}
                        color={COLORS.gold}
                        strokeWidth={1.8}
                    />
                </View>
                <View style={styles.totalInfo}>
                    <Text style={styles.totalLabel}>Total da conta</Text>
                    <Text style={styles.totalSubLabel}>{billTotalCount} produtos</Text>
                </View>
                <Text style={styles.totalValue}>
                    R$ {billTotal.toFixed(2).replace(".", ",")}
                </Text>
            </View>

            {/* MODAL CONFIRMAÇÃO ADIÇÃO PRODUTO */}
            <ConfirmModal
                visible={showSuccessModal}
                title="Adicionado com sucesso!"
                info={[]}
                onClose={onDismissSuccessModal}
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
        position: "relative",
    },

    contentContainer: {
        gap: hp("1.5%"),
    },

    productsList: {
        height: hp("25%"),
    },

    // BILL INFO CARD

    billInfoCard: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        padding: wp("4%"),
        marginBottom: hp("2%"),
    },

    billHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("2%"),
    },

    billIconContainer: {
        width: wp("14%"),
        height: wp("14%"),
        borderRadius: wp("7%"),
        borderWidth: 1.5,
        borderColor: COLORS.gold,
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("3%"),
    },

    billName: {
        color: COLORS.textPrimary,
        fontSize: wp("5%"),
        fontWeight: "600",
    },

    billStats: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: hp("2%"),
    },

    statItem: {
        flex: 1,
        alignItems: "center",
    },

    statDivider: {
        width: 1,
        height: hp("4%"),
        backgroundColor: COLORS.border,
        marginHorizontal: wp("2%"),
    },

    statValue: {
        color: COLORS.gold,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    statLabel: {
        color: COLORS.textSecondary,
        fontSize: wp("2.8%"),
        marginTop: hp("0.3%"),
    },

    statusBadge: {
        backgroundColor: COLORS.success,
        paddingHorizontal: wp("2%"),
        paddingVertical: hp("0.5%"),
        borderRadius: wp("1%"),
    },

    statusClosed: {
        backgroundColor: COLORS.textMuted,
    },

    statusText: {
        color: COLORS.background,
        fontSize: wp("2.8%"),
        fontWeight: "600",
    },

    statusTextClosed: {
        color: COLORS.textPrimary,
    },

    // ACTION BUTTONS

    actionsContainer: {
        flexDirection: "row",
        gap: wp("2%"),
        marginBottom: hp("2.5%"),
    },

    actionButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingVertical: hp("2%"),
        gap: wp("1.5%"),
    },

    actionText: {
        color: COLORS.textSecondary,
        fontSize: wp("2.5%"),
        textAlign: "center",
    },

    deleteText: {
        color: COLORS.danger,
    },

    // SECTION

    sectionTitle: {
        color: COLORS.textPrimary,
        fontSize: wp("4.5%"),
        fontWeight: "600",
        marginBottom: hp("1.5%"),
        paddingBottom: hp("0.5%"),
        borderBottomWidth: 2,
        borderBottomColor: COLORS.gold,
        alignSelf: "flex-start",
    },

    // ADD PRODUCT SECTION

    addProductSection: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        padding: wp("5%"),
        marginBottom: hp("2%"),
    },

    label: {
        color: COLORS.gold,
        fontSize: wp("3.5%"),
        fontWeight: "600",
        letterSpacing: 0.5,
        marginBottom: hp("1%"),
        marginTop: hp("1.5%"),
    },

    // COMBO BOX

    comboBoxContainer: {
        position: "relative",
        zIndex: 1,
    },

    comboBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingHorizontal: wp("3%"),
        height: hp("6%"),
        gap: wp("2%"),
    },

    comboBoxInput: {
        flex: 1,
        color: COLORS.textPrimary,
        fontSize: wp("3.5%"),
    },

    comboBoxIcon: {
        transform: [{ rotate: "0deg" }],
    },

    comboBoxIconOpen: {
        transform: [{ rotate: "180deg" }],
    },

    comboBoxDropdown: {
        position: "absolute",
        top: hp("6.5%"),
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        maxHeight: hp("25%"),
        overflow: "hidden",
        zIndex: 2,
    },

    comboBoxLoading: {
        padding: hp("3%"),
        alignItems: "center",
    },

    comboBoxList: {
        maxHeight: hp("30%"),
    },

    comboBoxItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1.5%"),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    comboBoxItemText: {
        color: COLORS.textPrimary,
        fontSize: wp("3.5%"),
    },

    comboBoxItemPrice: {
        color: COLORS.gold,
        fontSize: wp("3.2%"),
        fontWeight: "500",
    },

    comboBoxEmptyText: {
        color: COLORS.textMuted,
        fontSize: wp("3.2%"),
        textAlign: "center",
        padding: hp("3%"),
    },

    // QUANTITY

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        height: hp("6%"),
    },

    quantityButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },

    quantityValue: {
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
        fontWeight: "600",
        minWidth: wp("10%"),
        textAlign: "center",
    },

    // BUTTONS

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        height: hp("7%"),
        borderRadius: wp("2%"),
        marginTop: hp("2%"),
        gap: wp("2%"),
    },

    addButtonDisabled: {
        opacity: 0.6,
    },

    addButtonText: {
        color: COLORS.background,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    cancelButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: hp("6%"),
        borderRadius: wp("2%"),
        marginTop: hp("1.5%"),
        gap: wp("2%"),
    },

    cancelButtonText: {
        color: COLORS.textSecondary,
        fontSize: wp("3.5%"),
        fontWeight: "500",
    },

    // LIST

    footerLoading: {
        paddingVertical: hp("2%"),
        alignItems: "center",
        justifyContent: "center",
    },

    emptyContainer: {
        paddingVertical: hp("5%"),
        alignItems: "center",
    },

    emptyText: {
        color: COLORS.textMuted,
        fontSize: wp("3.5%"),
    },

    errorText: {
        color: COLORS.danger,
        fontSize: wp("3.2%"),
        marginTop: hp("1%"),
    },

    // TOTAL FOOTER

    totalFooter: {
        position: "absolute",
        bottom: hp("8%"),
        left: wp("5%"),
        right: wp("5%"),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.gold,
        borderRadius: wp("2%"),
        padding: wp("4%"),
    },

    totalIconContainer: {
        marginRight: wp("3%"),
    },

    totalInfo: {
        flex: 1,
    },

    totalLabel: {
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    totalSubLabel: {
        color: COLORS.textSecondary,
        fontSize: wp("2.8%"),
        marginTop: hp("0.2%"),
    },

    totalValue: {
        color: COLORS.gold,
        fontSize: wp("5%"),
        fontWeight: "700",
    },

    // ACCESS FOOTER

    accessFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("2%"),
        gap: wp("1.5%"),
    },

    accessText: {
        color: COLORS.textMuted,
        fontSize: wp("2.8%"),
        textAlign: "center",
    },
});
