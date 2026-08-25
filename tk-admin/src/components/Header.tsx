import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  ChevronLeft,
  Plus,
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
  actionIcon?: "plus";
  onActionPress?: () => void;
}

export function Header({
  title,
  showBackButton = false,
  onBackPress,
  actionIcon,
  onActionPress,
}: HeaderProps) {

  return (
    <View style={styles.header}>

      {showBackButton ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sideButton}
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

      {actionIcon === "plus" ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionButton}
          onPress={onActionPress}
        >
          <Plus
            size={wp("5%")}
            color={COLORS.gold}
            strokeWidth={2}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.sidePlaceholder} />
      )}

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

  sideButton: {
    width: wp("10%"),
    height: wp("10%"),
    alignItems: "center",
    justifyContent: "center",
  },

  sidePlaceholder: {
    width: wp("10%"),
    height: wp("10%"),
  },

  actionButton: {
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("5%"),
    borderWidth: 1.5,
    borderColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
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
