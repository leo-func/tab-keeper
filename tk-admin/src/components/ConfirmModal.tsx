import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    Modal,
    StyleSheet,
} from "react-native";

import { Check } from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { COLORS } from "../constants/Color";

interface InfoItem {
    label: string;
    value: string;
}

interface ConfirmModalProps {
    visible: boolean;
    title: string;
    info: InfoItem[];
    onClose: () => void;
}

export function ConfirmModal({
    visible,
    title,
    info,
    onClose,
}: ConfirmModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.overlay}
                onPress={onClose}
            >
                <Pressable onPress={() => {}}>
                    <View style={styles.modal}>
                    <View style={styles.iconContainer}>
                        <Check
                            size={wp("8%")}
                            color={COLORS.success}
                            strokeWidth={2.5}
                        />
                    </View>

                    <Text style={styles.title}>
                        {title}
                    </Text>

                    <View style={styles.card}>
                        {info.map((item, index) => (
                            <View key={item.label}>
                                {index > 0 && (
                                    <View style={styles.divider} />
                                )}

                                <View style={styles.row}>
                                    <Text style={styles.label}>
                                        {item.label}
                                    </Text>

                                    <Text style={styles.value}>
                                        {item.value}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.button}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>
                            FECHAR
                        </Text>
                    </TouchableOpacity>
                    </View>
                </Pressable>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        alignItems: "center",
        justifyContent: "center",
    },

    modal: {
        backgroundColor: COLORS.surface,
        borderRadius: wp("3%"),
        padding: hp("3%"),
        width: wp("85%"),
        alignItems: "center",
        gap: hp("2%"),
    },

    iconContainer: {
        width: wp("16%"),
        height: wp("16%"),
        borderRadius: wp("8%"),
        borderWidth: 2,
        borderColor: COLORS.success,
        alignItems: "center",
        justifyContent: "center",
    },

    title: {
        color: COLORS.textPrimary,
        fontSize: wp("4.5%"),
        fontWeight: "600",
    },

    card: {
        width: "100%",
        backgroundColor: COLORS.surfaceLight,
        borderRadius: wp("2%"),
        padding: hp("2%"),
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    label: {
        color: COLORS.textSecondary,
        fontSize: wp("3.2%"),
    },

    value: {
        color: COLORS.textPrimary,
        fontSize: wp("3.8%"),
        fontWeight: "500",
    },

    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: hp("1.5%"),
    },

    button: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.gold,
        height: hp("6%"),
        borderRadius: wp("2%"),
    },

    buttonText: {
        color: COLORS.background,
        fontSize: wp("4%"),
        fontWeight: "600",
    },
});
