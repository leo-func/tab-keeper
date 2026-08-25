import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Package, ChevronRight } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { Product } from "../model/Product";

interface ProductCardProps {
    product: Product;
    onPress?: (id: string) => void;
}

export function ProductCard({
    product,
    onPress,
}: ProductCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.card}
            onPress={() => onPress?.(product.id)}
        >
            <View style={styles.iconContainer}>
                <Package
                    size={wp("6%")}
                    color={COLORS.gold}
                    strokeWidth={1.8}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text
                    style={styles.productName}
                    numberOfLines={1}
                >
                    {product.name}
                </Text>

                <Text style={styles.productPrice}>
                    Preço:{" "}
                    <Text style={styles.priceValue}>
                        R$ {product.price.toFixed(2)}
                    </Text>
                </Text>
            </View>

            <ChevronRight
                size={wp("5.5%")}
                color={COLORS.textSecondary}
                strokeWidth={2}
            />
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

    productName: {
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    productPrice: {
        color: COLORS.textSecondary,
        fontSize: wp("3.2%"),
        marginTop: hp("0.4%"),
    },

    priceValue: {
        color: COLORS.gold,
        fontWeight: "500",
    },
});
