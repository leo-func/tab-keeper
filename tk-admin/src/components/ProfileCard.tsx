import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { User, Pencil, FileText } from "lucide-react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { COLORS } from "../constants/Color";
import { Profile } from "../model/Profile";

interface ProfileCardProps {
    profile: Profile;
    onEdit?: (id: string) => void;
    onBills?: (id: string) => void;
}

export function ProfileCard({
    profile,
    onEdit,
    onBills,
}: ProfileCardProps) {
    return (
        <View style={styles.card}>
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

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    onPress={() => onEdit?.(profile.id)}
                >
                    <Pencil
                        size={wp("4.5%")}
                        color={COLORS.gold}
                        strokeWidth={1.8}
                    />
                    <Text style={styles.actionText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.actionButton}
                    activeOpacity={0.7}
                    onPress={() => onBills?.(profile.id)}
                >
                    <FileText
                        size={wp("4.5%")}
                        color={COLORS.gold}
                        strokeWidth={1.8}
                    />
                    <Text style={styles.actionText}>Contas</Text>
                </TouchableOpacity>
            </View>
        </View>
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

    actionsContainer: {
        flexDirection: "row",
        gap: wp("2%"),
    },

    actionButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: wp("1.5%"),
        paddingHorizontal: wp("2.5%"),
        paddingVertical: hp("1%"),
        minWidth: wp("14%"),
    },

    actionText: {
        color: COLORS.textSecondary,
        fontSize: wp("2.5%"),
        marginTop: hp("0.3%"),
    },
});
