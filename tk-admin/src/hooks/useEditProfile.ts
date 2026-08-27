import { useState } from "react";
import { UpdateProfile, DeleteProfile } from "../services/profile.service";

export function useEditProfile(profileId: string) {
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    async function HandleUpdate() {
        try {
            if (!name.trim()) return

            setLoading(true)
            setError(null)

            await UpdateProfile(profileId, name.trim())
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    async function HandleDelete() {
        try {
            setLoading(true)
            setError(null)

            await DeleteProfile(profileId)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        name,
        setName,
        loading,
        error,
        HandleUpdate,
        HandleDelete,
    }
}
