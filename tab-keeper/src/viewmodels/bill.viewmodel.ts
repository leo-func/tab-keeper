import { useEffect, useRef, useState } from "react";
import { Bill } from "../model/bill.model";
import { getBills, searchBills } from "../services/bill.service";
import { router } from "expo-router";
import { useDebounce } from "../hooks/useDebounce";

export function useBillViewModel(billId?: string) {
    const [bills, setBills] = useState<Bill[] | null> (null)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null> (null)

    const [hasMore, setHasMore] = useState(true)
    const loadingRef = useRef(false)
    const pageRef = useRef(1)

    const debouncedSearch = useDebounce(search)

    useEffect(() => {
        async function loadBills () {
            HandleBills(pageRef.current)
        }

        loadBills()
    }, [])

    useEffect(() => {
        HandleSearchBills(debouncedSearch, 1);
    }, [debouncedSearch])

    async function HandleSearchBills(query: string, pageToLoad: number) {
        loadingRef.current = true;

        try {
            setLoading(true);
            setError(null);

            const data = await searchBills(query, pageToLoad);

            if (pageToLoad === 1) {
                setBills(data);
            } else {
                setBills((prev) => [...(prev ?? []), ...data]);
            }

            if (data.length < 10) {
                setHasMore(false);
                return;
            }

            pageRef.current = pageToLoad + 1;
        } catch (exception) {
            setError(exception as Error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }

    async function HandleBills(pageToLoad: number) {
        loadingRef.current = true

        try {
            setLoading(true);
            setError(null);

            const data = await getBills(pageToLoad);

            if (pageToLoad === 1) {
                setBills(data);
            } else {
                setBills((prev) => [...(prev ?? []), ...data]);
            }

            if (data.length < 10) {
                setHasMore(false);
                return;
            }

            
            pageRef.current = pageToLoad + 1
            
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    function HandleSearch(text: string) {
        setSearch(text);
    }

    function loadNextPage() {
        if (loadingRef.current || !hasMore) return;

        if (search.trim() === "") {
            HandleBills(pageRef.current);
        } else {
            HandleSearchBills(search, pageRef.current);
        }
    }

    function goToDetails(name: string, billId: string, total: string) {
        router.push('/bills/details')
    }
 

    return {
        bills,
        loading,
        error,
        HandleBills,
        search,
        HandleSearch,
        loadNextPage,
        goToDetails
    }
}