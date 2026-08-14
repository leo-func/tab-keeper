import { useEffect, useState } from "react";
import { Profile } from "../model/profile.model";
import { getProfileByCode } from "../services/profile.service";
import { router } from "expo-router";
import { getCode, saveProfileSession } from "../services/storage.service";

export function useProfileViewModel() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        async function loadProfileIfCode() {
            const code = await getCode();

            if (!code) return

            getProfile(code)
        }

        loadProfileIfCode()
    }, [])

    async function getProfile(code: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getProfileByCode(code.toLowerCase())
            
            if (!data) {
                setError('Código inválido')
                return
            }

            setProfile(data)

            saveProfileSession(data.id, code)
            
            goToBills()
        } catch (exception) {
            setError(exception as string)
        } finally {
            setLoading(false)
        }
    }

    function HandleCodeChange(value: string, index: number) {
        const newCode = code.split("")

        newCode[index] = value

        setCode(newCode.join(""));
    }

    function goToBills() {
        router.replace('/bills')
    }

    return {
        profile,
        loading,
        error,
        code,
        setCode,
        getProfile,
        goToBills,
        HandleCodeChange,
    }


}