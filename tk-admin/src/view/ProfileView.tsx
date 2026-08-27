import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";

import { Search, User, UserPlus } from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { COLORS } from "../constants/Color";
import { ProfileCard } from "../components/ProfileCard";
import { Header } from "../components/Header";
import { FloatingMenu } from "../components/FloatingMenu";
import { useProfileViewModel } from "../viewmodels/profile.viewmodel";
import { useFloatingMenu } from "../hooks/useFloatingMenu";

export default function ProfileView({
    profiles,
    loading,
    error,
    loadNextPage,
    goToEdit,
    goToCreate
}: ReturnType<typeof useProfileViewModel> & {goToEdit: (profileId: string) => void, goToCreate: () => void}) {

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Header
                    title="PERFIS"
                />

                <View style={styles.searchContainer}>
                    <Search
                        size={wp("5.5%")}
                        color={COLORS.textSecondary}
                        strokeWidth={2}
                    />

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar perfil"
                        placeholderTextColor={COLORS.textSecondary}
                    />
                </View>

                <TouchableOpacity
                    style={styles.addButton}
                    activeOpacity={0.7}
                    onPress={goToCreate}
                >
                    <UserPlus
                        size={wp("5%")}
                        color={COLORS.background}
                        strokeWidth={2}
                    />
                    <Text style={styles.addButtonText}>Adicionar Perfil</Text>
                </TouchableOpacity>

                {loading && !profiles?.length ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={COLORS.gold} />
                    </View>
                ) : error ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>{error.message}</Text>
                    </View>
                ) : (
                    <FlatList
                        data={profiles}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadNextPage}
                        onEndReachedThreshold={0.1}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }) => (
                            <ProfileCard
                                profile={item}
                                onEdit={() => goToEdit(item.id)}
                                onBills={() => {}}
                            />
                        )}
                        ListFooterComponent={
                            loading ? (
                                <View style={styles.footerLoading}>
                                    <ActivityIndicator
                                        size="small"
                                        color={COLORS.gold}
                                    />
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <View style={styles.emptyIconContainer}>
                                    <User
                                        size={wp("15%")}
                                        color={COLORS.textMuted}
                                        strokeWidth={1.5}
                                    />
                                </View>

                                <Text style={styles.emptyText}>
                                    Nenhum perfil encontrado
                                </Text>

                                <Text style={styles.emptySubtext}>
                                    Adicione um novo perfil usando{"\n"}
                                    o botão acima.
                                </Text>
                            </View>
                        }
                    />
                )}
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

    // SEARCH

    searchContainer: {
        height: hp("5.5%"),
        backgroundColor: COLORS.surfaceLight,
        borderRadius: wp("1.5%"),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("3.5%"),
        marginBottom: hp("1%"),
    },

    searchInput: {
        flex: 1,
        marginLeft: wp("2.5%"),
        color: COLORS.textPrimary,
        fontSize: wp("3.8%"),
    },

    addButton: {
        backgroundColor: COLORS.gold,
        borderRadius: wp("1.5%"),
        paddingVertical: hp("1.5%"),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("1.5%"),
        gap: wp("2%"),
    },

    addButtonText: {
        color: COLORS.background,
        fontSize: wp("3.8%"),
        fontWeight: "600",
    },

    // LIST

    listContent: {
        paddingBottom: hp("3%"),
        gap: hp("1.2%"),
    },

    // LOADING DA PAGINAÇÃO

    footerLoading: {
        paddingVertical: hp("2%"),
        alignItems: "center",
        justifyContent: "center",
    },

    // LOADING INICIAL

    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    // EMPTY

    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: hp("10%"),
    },

    emptyIconContainer: {
        width: wp("20%"),
        height: wp("20%"),
        borderRadius: wp("10%"),
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: hp("2%"),
    },

    emptyText: {
        color: COLORS.textPrimary,
        fontSize: wp("3.8%"),
        marginBottom: hp("1%"),
    },

    emptySubtext: {
        color: COLORS.textMuted,
        fontSize: wp("3.2%"),
        textAlign: "center",
        lineHeight: wp("5%"),
    },

    // ERROR

    errorText: {
        color: COLORS.gold,
        fontSize: wp("3.8%"),
        textAlign: "center",
    },
});
