import { useState } from "react";
import { Profile } from "../model/Profile";
import { InsertNewProfile } from "../services/profile.service";

export function useNewProfile() {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [createdProfile, setCreatedProfile] = useState<Profile | null>(null)

    async function HandleNewProfile() {
        try {
            if (!name) return

            setLoading(true)
            setError("")

            const data = await InsertNewProfile(name, "user")

            if (!data) {
                setError("Erro ao criar perfil")
                return
            }

            setCreatedProfile(data)
            setName("")
        } catch (exception: any) {
            setError(exception?.message ?? "Erro ao criar perfil")
        } finally {
            setLoading(false)
        }
    }

    function onDismissCreated() {
        setCreatedProfile(null)
    }

    return {
        name,
        setName,
        loading,
        error,
        HandleNewProfile,
        createdProfile,
        onDismissCreated,
    }
}