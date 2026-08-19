import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  ChevronRight,
  ReceiptText,
} from "lucide-react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { COLORS } from "../constants/Color";
import { Bill } from "../model/bill.model";
import { formatDate } from "../utils/formatDate";
import { formatPrice } from "../utils/formatPrice";

interface BillCardProps {
  bill: Bill;
  onPress: (id: string) => void;
}

export function BillCard({
  bill,
  onPress,
}: BillCardProps) {

  const isClosed = bill.closed_at !== null;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.billContainer}
      onPress={() => onPress(bill.id)}
    >
      {/* PRIMEIRA LINHA */}
      <View style={styles.mainRow}>
        <View style={styles.accountInfo}>
          <View style={styles.iconContainer}>
            <ReceiptText
              size={wp("6%")}
              color={COLORS.gold}
              strokeWidth={1.8}
            />
          </View>

          <View style={styles.nameContainer}>
            <Text
              style={styles.billName}
              numberOfLines={1}
            >
              Conta {bill.name}
            </Text>

            {/* STATUS */}
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  isClosed && styles.closedStatusDot,
                ]}
              />

              <Text
                style={[
                  styles.statusText,
                  isClosed && styles.closedStatusText,
                ]}
              >
                {isClosed ? "Fechada" : "Aberta"}
              </Text>
            </View>
          </View>
        </View>

        {/* TOTAL */}
        <View style={styles.totalContainer}>
          <Text style={styles.total}>
            R$ {formatPrice(bill.total)}
          </Text>

          <ChevronRight
            size={wp("5.5%")}
            color={COLORS.textSecondary}
            strokeWidth={2}
          />
        </View>
      </View>

      {/* INFORMAÇÕES */}
      <View style={styles.detailsContainer}>
        {isClosed ? (
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Fechada em</Text>
            <Text style={styles.dateValue}>
              {formatDate(bill.closed_at!)}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Criada em</Text>
              <Text style={styles.dateValue}>
                {formatDate(bill.created_at)}
              </Text>
            </View>

            <View style={styles.verticalDivider} />

            <View style={styles.dateContainer}>
              <Text style={styles.dateLabel}>Última atualização</Text>
              <Text style={styles.dateValue}>
                {formatDate(bill.updated_at)}
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  billContainer: {
    paddingVertical: hp("2.1%"),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("6%"),
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  nameContainer: {
    marginLeft: wp("3%"),
    flex: 1,
  },

  billName: {
    color: COLORS.textPrimary,
    fontSize: wp("4%"),
    fontWeight: "600",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("0.5%"),
  },

  statusDot: {
    width: wp("2%"),
    height: wp("2%"),
    borderRadius: wp("1%"),
    backgroundColor: COLORS.success,
    marginRight: wp("1.5%"),
  },

  statusText: {
    color: COLORS.success,
    fontSize: wp("3.2%"),
    fontWeight: "500",
  },

  closedStatusDot: {
    backgroundColor: COLORS.textSecondary,
  },

  closedStatusText: {
    color: COLORS.textSecondary,
  },

  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp("2%"),
  },

  total: {
    color: COLORS.gold,
    fontSize: wp("3.7%"),
    fontWeight: "700",
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
    marginLeft: wp("0.5%"),
  },

  dateContainer: {
    flex: 1,
  },

  dateLabel: {
    color: COLORS.textSecondary,
    fontSize: wp("3.1%"),
    marginBottom: hp("0.6%"),
  },

  dateValue: {
    color: COLORS.textPrimary,
    fontSize: wp("3.4%"),
    fontWeight: "500",
  },

  verticalDivider: {
    width: 1,
    height: hp("5%"),
    backgroundColor: COLORS.border,
    marginHorizontal: wp("5%"),
  },

});