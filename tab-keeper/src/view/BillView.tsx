import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Search } from "lucide-react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/Color";
import { BillCard } from "../components/BillCard";
import { Header } from "../components/Header";
import { useBillViewModel } from "../viewmodels/bill.viewmodel";
import { FloatingMenu } from "../components/FloatingMenu";
import { useFloatingMenu } from "../hooks/useFloatingMenu";

export function BillView({
  bills,
  loading,
  error,
  goToDetails,
  loadNextPage,
  search,
  HandleSearch
}: ReturnType<typeof useBillViewModel>) {
  const { HandleLogout } = useFloatingMenu();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="CONTAS" />

        <View style={styles.searchContainer}>
          <Search
            size={wp("5.5%")}
            color={COLORS.textSecondary}
            strokeWidth={2}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar conta"
            value={search}
            onChangeText={HandleSearch}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {loading && bills?.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : error ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        ) : (
          <FlatList
            data={bills}
            keyExtractor={(item) => item.id}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <BillCard
                bill={item}
                onPress={() =>
                  goToDetails(item.name, item.id, String(item.total))
                }
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
                <Text style={styles.emptyText}>
                  Nenhuma conta encontrada
                </Text>
              </View>
            }
          />
        )}
      </View>

      <FloatingMenu onLogout={HandleLogout} />
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

  // LOADING INICIAL

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // LOADING DA PAGINAÇÃO

  footerLoading: {
    paddingVertical: hp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },

  // LIST

  listContent: {
    paddingBottom: hp("3%"),
  },

  // EMPTY

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("10%"),
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: wp("3.8%"),
  },

  // ERROR

  errorText: {
    color: COLORS.gold,
    fontSize: wp("3.8%"),
    textAlign: "center",
  },
});