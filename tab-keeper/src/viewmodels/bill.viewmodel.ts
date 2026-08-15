import { useEffect, useRef, useState } from "react";
import { Bill } from "../model/bill.model";
import { getBills } from "../services/bill.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getProfileId } from "../services/storage.service";

export function useBillViewModel(billId?: string) {
    const [bills, setBills] = useState<Bill[] | null> (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null> (null)

    const [hasMore, setHasMore] = useState(true)
    const loadingRef = useRef(false)
    const pageRef = useRef(1)

    useEffect(() => {
        async function loadBills () {
            HandleBills(pageRef.current)
        }

        loadBills()
    }, [])


    async function HandleBills(pageToLoad: number) {
        loadingRef.current = true

        try {

            setLoading(true)

            setError(null)

            const data = await getBills(pageToLoad)


            setBills(prev => [
                ...(prev ?? []),
                ...data
            ])


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

    function loadNextPage() {
        if ( loadingRef || !hasMore) return;

        HandleBills(pageRef.current);
    }

    function goToDetails(name: string, billId: string) {
        router.push('/bills/details')
    }

    return {
        bills,
        loading,
        error,
        HandleBills,
        loadNextPage,
        goToDetails
    }
}