import { useEffect, useRef, useState } from "react";
import { Profile } from "../model/Profile";
import { GetProfiles, SearchProfiles } from "../services/profile.service";
import { useNewProfile } from "../hooks/useNewProfile";
import { usePullToRefresh } from "../hooks/usePullToRefresh";
import { useDebounce } from "../hooks/useDebounce";

export function useProfileViewModel() {
    const [profiles, setProfiles] = useState<Profile[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const {
        name,
        setName,
        loading: createLoading,
        error: createError,
        HandleNewProfile,
        createdProfile,
        onDismissCreated,
    } = useNewProfile()

    const { refreshing, handleRefresh } = usePullToRefresh()

    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const pageRef = useRef(1);

    useEffect(() => {
        HandleProfiles(pageRef.current)
    }, [])

    useEffect(() => {
        setProfiles([])
        setHasMore(true)
        pageRef.current = 1
        HandleProfiles(1)
    }, [debouncedSearch])

    async function HandleProfiles(pageToLoad: number) {
        if (!hasMore || loadingRef.current) return

        loadingRef.current = true
        try {
            setError(null)
            setLoading(true)

            const data = debouncedSearch
                ? await SearchProfiles(debouncedSearch, pageToLoad)
                : await GetProfiles(pageToLoad)

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

    async function HandleRefresh() {
            await handleRefresh(async () => {
                const data = debouncedSearch
                    ? await SearchProfiles(debouncedSearch, 1)
                    : await GetProfiles(1)

                setProfiles(data)
                setHasMore(data.length >= 10)
                pageRef.current = 2
        })
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
        refreshing,
        HandleRefresh,

        name,
        setName,
        createLoading,
        createError,
        handleCreate: HandleNewProfile,
        createdProfile,
        onDismissCreated,
    }
}