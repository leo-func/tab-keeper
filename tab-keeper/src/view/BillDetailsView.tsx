import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/Color";
import { Header } from "../components/Header";
import { BillProductCard } from "../components/BillProductCard";
import { useProductViewModel } from "../viewmodels/products.viewmodel";
import { formatPrice } from "../utils/formatPrice";

export function BillDetailsView({
  billProducts,
  loading,
  loadNextPage,
  onBack,
  name,
  total,
}: ReturnType<typeof useProductViewModel> & {
  name: string;
  onBack: () => void;
  total: number;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title={name}
          showBackButton
          onBackPress={onBack}
        />

        {loading && billProducts?.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={COLORS.gold}
            />
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>
              PRODUTOS DA CONTA
            </Text>

            <View style={styles.productsContainer}>
              <FlatList
                data={billProducts}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                showsVerticalScrollIndicator={false}
                onEndReached={loadNextPage}
                onEndReachedThreshold={0.5}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                  <View style={styles.separator} />
                )}
                renderItem={({ item }) => (
                  <BillProductCard product={item} />
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
                      Nenhum produto encontrado
                    </Text>
                  </View>
                }
              />
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>
                Total da conta
              </Text>

              <Text style={styles.totalValue}>
                R$ {formatPrice(total)}
              </Text>
            </View>
          </>
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

  sectionTitle: {
    color: COLORS.gold,
    fontSize: wp("4%"),
    fontWeight: "700",
    marginTop: hp("1%"),
    marginBottom: hp("1.5%"),
  },

  productsContainer: {
    flex: 1,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: wp("1%"),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  listContent: {
    paddingVertical: hp("0.5%"),
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: wp("4%"),
  },

  totalContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: wp("1%"),
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("4%"),
    marginTop: hp("1.8%"),
    marginBottom: hp("2%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: COLORS.gold,
    fontSize: wp("4%"),
    fontWeight: "700",
  },

  totalValue: {
    color: COLORS.gold,
    fontSize: wp("4.3%"),
    fontWeight: "700",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  footerLoading: {
    paddingVertical: hp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("6%"),
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: wp("3.8%"),
  },

});