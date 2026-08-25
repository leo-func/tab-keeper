import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User, ChevronRight } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { Profile } from "../model/Profile";

interface ProfileCardProps {
    profile: Profile;
    onPress?: (id: string) => void;
}

export function ProfileCard({
    profile,
    onPress,
}: ProfileCardProps) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.card}
            onPress={() => onPress?.(profile.id)}
        >
            <View style={styles.iconContainer}>
                <User
                    size={wp("6%")}
                    color={COLORS.gold}
                    strokeWidth={1.8}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text
                    style={styles.profileName}
                    numberOfLines={1}
                >
                    {profile.name}
                </Text>

                <Text style={styles.profileCode}>
                    Código:{" "}
                    <Text style={styles.codeValue}>
                        {profile.access_token}
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

    profileName: {
        color: COLORS.textPrimary,
        fontSize: wp("4%"),
        fontWeight: "600",
    },

    profileCode: {
        color: COLORS.textSecondary,
        fontSize: wp("3.2%"),
        marginTop: hp("0.4%"),
    },

    codeValue: {
        color: COLORS.gold,
        fontWeight: "500",
    },
});
