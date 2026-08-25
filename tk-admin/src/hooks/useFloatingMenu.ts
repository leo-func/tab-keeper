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
        router.replace("/profiles/create");
    }

    function HandleAddProduct () {
        setSelected("product")
        router.replace("/products")
    }

    function HandleLogoutPress() {
        setSelected("logout");
    }

    function HandleCancelLogout() {
        setSelected(selected);
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
