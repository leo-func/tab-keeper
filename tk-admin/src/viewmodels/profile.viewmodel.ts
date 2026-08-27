import { useEffect, useRef, useState } from "react";
import { Profile } from "../model/Profile";
import { GetProfiles } from "../services/profile.service";
import { useNewProfile } from "../hooks/useNewProfile";
import { useEditProfile } from "../hooks/useEditProfile";
import { router } from "expo-router";

export function useProfileViewModel() {
    const [profiles, setProfiles] = useState<Profile[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [search, setSearch] = useState("")
    const {
        name,
        setName,
        loading: createLoading,
        error: createError,
        HandleNewProfile,
        createdProfile,
        onDismissCreated,
    } = useNewProfile()

    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const pageRef = useRef(1);

    useEffect(() => {
        HandleProfiles(pageRef.current)
    }, [])

    async function HandleProfiles(pageToLoad: number) {
        if (!hasMore || loadingRef.current) return

        loadingRef.current = true
        try {
            setError(null)
            setLoading(true)

            const data = await GetProfiles(pageToLoad)

            setProfiles((prev) => [
                ...(prev ?? []),
                ...data
            ])

            if (data.length < 10) {
                setHasMore(false)
                return
            }

            pageRef.current = pageToLoad + 1;

        } catch (exception) {
            setError(exception as Error)
        } finally {
            loadingRef.current = false
            setLoading(false)
        }
    }

    function loadNextPage() {
        HandleProfiles(pageRef.current)
    }

    function HandleSearch(value: string) {
        setSearch(value)
    }

    return {
        profiles,
        loading,
        error,
        loadNextPage,
        search,
        HandleSearch,

        name,
        setName,
        createLoading,
        createError,
        handleCreate: HandleNewProfile,
        createdProfile,
        onDismissCreated,
    }
}