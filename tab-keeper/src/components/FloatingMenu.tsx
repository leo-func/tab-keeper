import {
    Alert,
    Animated,
    TouchableOpacity,
    View,
} from "react-native";

import { useRef } from "react";

import { COLORS } from "../constants/Color";
import { Home, LogOut } from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFloatingMenu } from "../hooks/useFloatingMenu";

interface FloatingMenuProps {
    onLogout: () => void;
}

export function FloatingMenu({
    onLogout,
}: FloatingMenuProps) {

    const {
        selected,
        HandleHome,
        HandleLogoutPress,
        HandleCancelLogout,
    } = useFloatingMenu();

    const selectionPosition = useRef(
        new Animated.Value(0)
    ).current;

    function AnimateSelection(value: number) {
        Animated.spring(selectionPosition, {
            toValue: value,
            useNativeDriver: true,
            friction: 7,
            tension: 80,
        }).start();
    }

    function HandleHomePress() {
        HandleHome();
        AnimateSelection(0);
    }

    function HandleLogoutPressMenu() {
        HandleLogoutPress();
        AnimateSelection(1);

        Alert.alert(
            "Sair da conta",
            "Tem certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => {
                        HandleCancelLogout();
                        AnimateSelection(0);
                    },
                },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: onLogout,
                },
            ]
        );
    }

    return (
        <View
            style={{
                position: "absolute",
                bottom: 30,
                alignSelf: "center",
            }}
        >
            <View
                style={{
                    backgroundColor: COLORS.background,
                    borderWidth: 2,
                    borderColor: COLORS.border,
                    borderRadius: 12,
                    flexDirection: "row",
                    gap: wp("10%"),
                    padding: 15,
                    position: "relative",
                }}
            >

                {/* QUADRADO DE SELEÇÃO */}
                <Animated.View
                    pointerEvents="none"
                    style={{
                        position: "absolute",
                        bottom: 7,
                        left: 8,
                        width: wp("10%"),
                        height: wp("10%"),
                        backgroundColor: COLORS.gold,
                        borderRadius: 12,

                        transform: [
                            {
                                translateX:
                                    selectionPosition.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [
                                            0,
                                            wp("6.5%") + wp("10%"),
                                        ],
                                    }),
                            },
                        ],
                    }}
                />

                {/* HOME */}
                <TouchableOpacity
                    onPress={HandleHomePress}
                    style={{
                        zIndex: 1,
                    }}
                >
                    <Home
                        size={wp("6.5%")}
                        color={
                            selected === "home"
                                ? COLORS.border
                                : COLORS.gold
                        }
                        strokeWidth={1.8}
                    />
                </TouchableOpacity>

                {/* LOGOUT */}
                <TouchableOpacity
                    onPress={HandleLogoutPressMenu}
                    style={{
                        zIndex: 1,
                    }}
                >
                    <LogOut
                        size={wp("6.5%")}
                        color={
                            selected === "logout"
                                ? COLORS.border
                                : COLORS.gold
                        }
                        strokeWidth={1.8}
                    />
                </TouchableOpacity>

            </View>
        </View>
    );
}