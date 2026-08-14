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

export function BillDetailsView({
  billProducts,
  loading,
  loadNextPage,
  error,
  onBack,
  name,
}: ReturnType<typeof useProductViewModel> & {
  name: string;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <Header
          title={name}
          showBackButton
          onBackPress={onBack}
        />

        {/* LOADING INICIAL */}
        {loading && billProducts?.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={COLORS.gold}
            />
          </View>
        ) : (
          <FlatList
            data={billProducts}

            keyExtractor={(item, index) =>
              `${item.name}-${index}`
            }

            showsVerticalScrollIndicator={false}

            onEndReached={loadNextPage}
            onEndReachedThreshold={0.5}

            contentContainerStyle={styles.listContent}

            renderItem={({ item }) => (
              <BillProductCard
                product={item}
              />
            )}

            ListHeaderComponent={
              <Text style={styles.sectionTitle}>
                PRODUTOS DA CONTA
              </Text>
            }

            
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

  listContent: {
    paddingBottom: hp("3%"),
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

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp("10%"),
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: wp("3.8%"),
  },

});