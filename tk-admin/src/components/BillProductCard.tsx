import { View, Text, StyleSheet } from "react-native";
import { Package } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { BillProduct } from "../model/BillProduct";

interface BillProductCardProps {
    billProduct: BillProduct;
}

export function BillProductCard({
    billProduct,
}: BillProductCardProps) {
    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <Package
                    size={wp("5%")}
                    color={COLORS.gold}
                    strokeWidth={1.8}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text
                    style={styles.productName}
                    numberOfLines={1}
                >
                    {billProduct.name ?? "Produto"}
                </Text>

                <Text style={styles.productAmount}>
                    {billProduct.amount} unidades
                </Text>
            </View>

            <Text style={styles.productPrice}>
                R$ {billProduct.total_price.toFixed(2).replace(".", ",")}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingVertical: hp("1.8%"),
        paddingHorizontal: wp("3.5%"),
        flexDirection: "row",
        alignItems: "center",
    },

    iconContainer: {
        width: wp("9%"),
        height: wp("9%"),
        borderRadius: wp("4.5%"),
        backgroundColor: COLORS.surfaceLight,
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("3%"),
    },

    infoContainer: {
        flex: 1,
    },

    productName: {
        color: COLORS.textPrimary,
        fontSize: wp("3.8%"),
        fontWeight: "500",
    },

    productAmount: {
        color: COLORS.textSecondary,
        fontSize: wp("3%"),
        marginTop: hp("0.3%"),
    },

    productPrice: {
        color: COLORS.gold,
        fontSize: wp("3.5%"),
        fontWeight: "600",
    },
});
