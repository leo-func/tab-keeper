import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Package } from "lucide-react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { COLORS } from "../constants/Color";
import { BillProduct } from "../model/billProduct.model";
import { formatPrice } from "../utils/formatPrice";

interface BillProductCardProps {
  product: BillProduct;
}

export function BillProductCard({
  product,
}: BillProductCardProps) {

  return (
    <View style={styles.container}>

      {/* ÍCONE */}
      <View style={styles.iconContainer}>
        <Package
          size={wp("6.5%")}
          color={COLORS.gold}
          strokeWidth={1.8}
        />
      </View>

      {/* INFORMAÇÕES */}
      <View style={styles.infoContainer}>

        <Text
          style={styles.name}
          numberOfLines={1}
        >
          {product.name}
        </Text>

        <Text style={styles.amount}>
          Quantidade: {product.amount}
        </Text>

      </View>

      {/* PREÇO */}
      <Text style={styles.price}>
        R$ {formatPrice(product.total_price)}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    minHeight: hp("8.5%"),

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: wp("3.5%"),
    paddingVertical: hp("1.5%"),

    backgroundColor: COLORS.surfaceLight,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  iconContainer: {
    width: wp("11%"),
    height: wp("11%"),

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.3,
    borderColor: COLORS.gold,
    borderRadius: wp("2%"),
  },

  infoContainer: {
    flex: 1,
    marginLeft: wp("3%"),
  },

  name: {
    color: COLORS.textPrimary,
    fontSize: wp("3.8%"),
    fontWeight: "600",
  },

  amount: {
    marginTop: hp("0.5%"),

    color: COLORS.textSecondary,
    fontSize: wp("3.1%"),
  },

  price: {
    marginLeft: wp("2%"),

    color: COLORS.gold,
    fontSize: wp("3.6%"),
    fontWeight: "700",
  },

});