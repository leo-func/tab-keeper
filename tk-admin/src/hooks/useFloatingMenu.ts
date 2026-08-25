import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { singOut } from "../services/login.service";

type MenuItem = "home" | "add" | "product" | "logout";

export function useFloatingMenu() {
    const [selected, setSelected] = useState<MenuItem>("home");

    function HandleHomePress() {
        setSelected("home");
        router.replace("/profiles");
    }

    function HandleAddPress() {
        setSelected("add");
        router.push("/profiles/create");
    }

    function HandleAddProduct () {
        setSelected("product")
    }

    function HandleLogoutPress() {
        setSelected("logout");
    }

    function HandleCancelLogout() {
        setSelected("home");
    }

    async function HandleLogout() {
        await singOut();
        router.replace("/");
    }

    return {
        selected,
        HandleHomePress,
        HandleAddPress,
        HandleAddProduct,
        HandleLogoutPress,
        HandleCancelLogout,
        HandleLogout,
        setSelected
    };
}
