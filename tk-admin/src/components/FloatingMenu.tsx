import {
    Alert,
    Animated,
    TouchableOpacity,
    View,
} from "react-native";

import { useCallback, useRef } from "react";

import { COLORS } from "../constants/Color";
import { Home, LogOut, UserPlus, PackagePlus } from "lucide-react-native";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFloatingMenu } from "../hooks/useFloatingMenu";
import { useFocusEffect } from "expo-router";

interface FloatingMenuProps {
    onLogout: () => void;
}

export function FloatingMenu({
    onLogout,
}: FloatingMenuProps) {

    const {
        selected,
        HandleHomePress,
        HandleAddPress,
        HandleAddProduct,
        HandleLogoutPress,
        HandleCancelLogout,
        setSelected
    } = useFloatingMenu();

    const selectionPosition = useRef(
        new Animated.Value(0)
    ).current;

    function AnimateSelection(value: number) {
        Animated.spring(selectionPosition, {
            toValue: value,
            useNativeDriver: true,
            friction: 9,
            tension: 80,
        }).start();
    }

    useFocusEffect(
        useCallback(() => {
            setSelected("home")
            AnimateSelection(0)
        }, [])
    );

    function HandleHomePressMenu() {
        HandleHomePress();
        AnimateSelection(0);
    }

    function HandleAddPressMenu() {
        HandleAddPress();
        AnimateSelection(1);
    }

    function HandleAddProductPressMenu() {
        HandleAddPress();
        AnimateSelection(2);
    }

    function HandleLogoutPressMenu() {
        HandleLogoutPress();
        AnimateSelection(3);

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

    const itemWidth = wp("10%");
    const gap = wp("6%");

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
                    gap,
                    padding: 15,
                    position: "relative",
                }}
            >

                {/* QUADRADO DE SELEÇÃO */}
                <Animated.View
                    pointerEvents="none"
                    style={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        width: itemWidth,
                        height: itemWidth,
                        backgroundColor: COLORS.gold,
                        borderRadius: 12,
                        transform: [
                            {
                                translateX:
                                    selectionPosition.interpolate({
                                        inputRange: [0, 1, 2, 3],
                                        outputRange: [
                                            0,
                                            itemWidth + gap,
                                            (itemWidth + gap) * 2,
                                            (itemWidth + gap) * 2.3,
                                        ],
                                    }),
                            },
                        ],
                    }}
                />

                {/* HOME */}
                <TouchableOpacity
                    onPress={HandleHomePressMenu}
                    style={{ zIndex: 1 }}
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

                {/* ADD */}
                <TouchableOpacity
                    onPress={HandleAddPressMenu}
                    style={{ zIndex: 1 }}
                >
                    <UserPlus
                        size={wp("6.5%")}
                        color={
                            selected === "add"
                                ? COLORS.border
                                : COLORS.gold
                        }
                        strokeWidth={1.8}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={HandleAddProductPressMenu}
                    style={{ zIndex: 1 }}
                >
                    <PackagePlus
                        size={wp("6.5%")}
                        color={
                            selected === "add"
                                ? COLORS.border
                                : COLORS.gold
                        }
                        strokeWidth={1.8}
                    />
                </TouchableOpacity>
                
                {/* LOGOUT */}
                <TouchableOpacity
                    onPress={HandleLogoutPressMenu}
                    style={{ zIndex: 1 }}
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
