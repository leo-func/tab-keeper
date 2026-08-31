import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Package, ChevronRight, Trash2 } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { Product } from "../model/Product";

interface ProductCardProps {
    product: Product;
    onPress?: (id: string) => void;
    subtitle?: string;
    rightLabel?: string;
    showChevron?: boolean;
    onDelete?: (id: string) => void;
}

export function ProductCard({
    product,
    onPress,
    subtitle,
    rightLabel,
    showChevron = true,
    onDelete,
}: ProductCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={onPress ? 0.7 : 1}
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

                {subtitle && (
                    <Text style={styles.productSubtitle}>
                        {subtitle}
                    </Text>
                )}

                {!subtitle && (
                    <Text style={styles.productPrice}>
                        Preço:{" "}
                        <Text style={styles.priceValue}>
                            R$ {product.price.toFixed(2)}
                        </Text>
                    </Text>
                )}
            </View>

            {rightLabel && (
                <Text style={styles.rightLabel}>
                    {rightLabel}
                </Text>
            )}

            {onDelete && (
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.deleteButton}
                    onPress={() => onDelete(product.id)}
                >
                    <Trash2
                        size={wp("4%")}
                        color={COLORS.danger}
                        strokeWidth={1.8}
                    />
                </TouchableOpacity>
            )}

            {showChevron && (
                <ChevronRight
                    size={wp("5.5%")}
                    color={COLORS.textSecondary}
                    strokeWidth={2}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("2%"),
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("3%"),
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp("0.8%"),
    },

    iconContainer: {
        width: wp("9%"),
        height: wp("9%"),
        borderRadius: wp("4.5%"),
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1.5,
        borderColor: COLORS.gold,
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("2.5%"),
    },

    infoContainer: {
        flex: 1,
    },

    productName: {
        color: COLORS.textPrimary,
        fontSize: wp("3.5%"),
        fontWeight: "600",
    },

    productSubtitle: {
        color: COLORS.textSecondary,
        fontSize: wp("2.8%"),
        marginTop: hp("0.2%"),
    },

    productPrice: {
        color: COLORS.textSecondary,
        fontSize: wp("2.8%"),
        marginTop: hp("0.2%"),
    },

    priceValue: {
        color: COLORS.gold,
        fontWeight: "500",
    },

    rightLabel: {
        color: COLORS.gold,
        fontSize: wp("3.2%"),
        fontWeight: "600",
        marginRight: wp("2%"),
    },

    deleteButton: {
        width: wp("8%"),
        height: wp("8%"),
        borderRadius: wp("1.5%"),
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: "center",
        justifyContent: "center",
        marginRight: wp("2%"),
    },
});
