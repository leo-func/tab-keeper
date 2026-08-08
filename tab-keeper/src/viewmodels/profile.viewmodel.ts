import { use, useState } from "react";
import { Profile } from "../model/profile.model";
import { getProfileByCode } from "../services/user.model";

export function useProfileViewModel() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)


    async function getProfile(code: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getProfileByCode(code)

            setProfile(data)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        profile,
        loading,
        error,
        getProfile,
    }


}