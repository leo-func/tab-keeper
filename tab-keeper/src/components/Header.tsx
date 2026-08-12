import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  ChevronLeft,
} from "lucide-react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { COLORS } from "../constants/Color";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  onBackPress,
}: HeaderProps) {

  return (
    <View style={styles.header}>

      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backButton}
          onPress={onBackPress}
        >
          <ChevronLeft
            size={wp("7%")}
            color={COLORS.gold}
            strokeWidth={2}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.sidePlaceholder} />
      )}

      <Text
        style={styles.title}
        numberOfLines={1}
      >
        {title}
      </Text>

      <View style={styles.sidePlaceholder} />

    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    height: hp("8%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: wp("10%"),
    height: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
  },

  sidePlaceholder: {
    width: wp("10%"),
    height: wp("10%"),
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: COLORS.gold,
    fontSize: wp("4.8%"),
    fontWeight: "700",
    letterSpacing: 0.5,
  },

});