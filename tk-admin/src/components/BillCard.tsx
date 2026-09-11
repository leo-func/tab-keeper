import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ReceiptText } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { Bill } from "../model/Bill";

interface BillCardProps {
    bill: Bill;
    onPress?: (bill: Bill) => void;
}

export function BillCard({
    bill,
    onPress,
}: BillCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("pt-BR")
    }

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onPress?.(bill)}
        >
            <View style={styles.iconContainer}>
                <ReceiptText
                    size={wp("6%")}
                    color={COLORS.gold}
                    strokeWidth={1.8}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text
                    style={styles.billName}
                    numberOfLines={1}
                >
                    {bill.name}
                </Text>

                <Text style={styles.billDate}>
                    Criado:{" "}
                    <Text style={styles.dateValue}>
                        {formatDate(bill.created_at)}
                    </Text>
                </Text>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>
                    R$ {bill.total.toFixed(2).replace(".", ",")}
                </Text>
                {bill.prepaid_amount > 0 && (
                    <Text style={styles.prepaidValue}>
                        - R$ {bill.prepaid_amount.toFixed(2).replace(".", ",")}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingVertical: hp("2.1%"),
        paddingHorizontal: wp("3.5%"),
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: wp("11%"),
        height: wp("11%"),
        borderRadius: wp("5.5%"),
        borderWidth: 1.5,
        borderColor: COLORS.gold,
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("3%"),
    },

    infoContainer: {
        flex: 1,
    },

    billName: {
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    billDate: {
        color: COLORS.textSecondary,
        fontSize: wp("3.2%"),
        marginTop: hp("0.4%"),
    },

    dateValue: {
        color: COLORS.gold,
        fontWeight: "500",
    },

    totalContainer: {
        alignItems: "flex-end",
    },

    totalLabel: {
        color: COLORS.textSecondary,
        fontSize: wp("2.5%"),
    },

    totalValue: {
        color: COLORS.gold,
        fontSize: wp("3.5%"),
        fontWeight: "600",
        marginTop: hp("0.2%"),
    },

    prepaidValue: {
        color: COLORS.danger,
        fontSize: wp("3%"),
        fontWeight: "500",
        marginTop: hp("0.2%"),
    },
});
