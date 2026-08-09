import { use, useState } from "react";
import { Profile } from "../model/profile.model";
import { getProfileByCode } from "../services/user.model";
import { router } from "expo-router";

export function useProfileViewModel() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function getProfile(code: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getProfileByCode(code)
            
            if (!data) {
                setError('Código inválido')
                return
            }

            setProfile(data)
            goToBills()
        } catch (exception) {
            setError(exception as string)
        } finally {
            setLoading(false)
        }
    }

    function goToBills() {
        router.push('/bills/index')
    }

    return {
        profile,
        loading,
        error,
        code,
        setCode,
        getProfile,
        goToBills,
    }


}