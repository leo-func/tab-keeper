import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Package } from "lucide-react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/Color";
import { Header } from "../components/Header";
import { useHistoryViewModel } from "../viewmodels/history.viewmodel";
import { formatDate } from "../utils/formatDate";

export function HistoryView({
  history,
  loading,
  error,
  billName,
  onBack,
}: ReturnType<typeof useHistoryViewModel> & {
  billName: string;
  onBack: () => void;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title={billName}
          showBackButton
          onBackPress={onBack}
        />

        {loading && !history?.length ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.gold} />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <View style={styles.iconContainer}>
                  <Package
                    size={wp("5%")}
                    color={COLORS.gold}
                    strokeWidth={1.8}
                  />
                </View>

                <View style={styles.infoContainer}>
                  <Text style={styles.productName}>{item.product_name}</Text>
                  <Text style={styles.dateText}>{formatDate(item.added_at)}</Text>
                </View>

                <Text style={styles.amountText}>x{item.amount}</Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nenhum item no histórico</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
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

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    color: COLORS.danger,
    fontSize: wp("3.5%"),
    textAlign: "center",
  },

  listContent: {
    paddingBottom: hp("5%"),
  },

  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.5%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconContainer: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp("3%"),
  },

  infoContainer: {
    flex: 1,
  },

  productName: {
    color: COLORS.textPrimary,
    fontSize: wp("3.5%"),
    fontWeight: "600",
  },

  dateText: {
    color: COLORS.textSecondary,
    fontSize: wp("2.8%"),
    marginTop: hp("0.3%"),
  },

  amountText: {
    color: COLORS.gold,
    fontSize: wp("3.5%"),
    fontWeight: "600",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp("10%"),
  },

  emptyText: {
    color: COLORS.textSecondary,
    fontSize: wp("3.5%"),
  },
});
