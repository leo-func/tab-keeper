import { useEffect, useState } from "react";
import { Profile } from "../model/profile.model";
import { createAnonymousSession, connectProfileByCode } from "../services/profile.service";
import { router } from "expo-router";
import { getCode, saveProfileSession } from "../services/storage.service";
import { supabase } from "../utils/createClient";

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
            
            const { data: sessionData } = await supabase.auth.getSession();

            if (!sessionData.session) {
                await createAnonymousSession();
            }

            const profile = await connectProfileByCode(code.toLowerCase())
            
            if (!profile) {
                setError('Código inválido')
                return
            }
            setProfile(profile)

            saveProfileSession(code)
            
            goToBills()
        } catch (exception: any) {
            setError(exception.message)
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