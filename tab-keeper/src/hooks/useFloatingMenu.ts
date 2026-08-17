import { router } from "expo-router";
import { useState } from "react";
import { removeProfileSession } from "../services/storage.service";
import { logout } from "../services/profile.service";

type MenuItem = "home" | "logout";

export function useFloatingMenu() {
    const [selected, setSelected] = useState<MenuItem>("home");

    function HandleHome() {
        setSelected("home");
        router.replace("/bills");
    }

    function HandleLogoutPress() {
        setSelected("logout");
    }

    function HandleCancelLogout() {
        setSelected("home");
    }

    async function HandleLogout() {
        await logout();
        await removeProfileSession();

        router.replace("/login");
    }

    return {
        selected,
        HandleHome,
        HandleLogoutPress,
        HandleCancelLogout,
        HandleLogout,
    };
}