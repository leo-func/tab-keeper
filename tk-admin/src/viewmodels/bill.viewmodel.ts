import { useCallback, useRef, useState } from "react";
import { Bill } from "../model/Bill";
import { GetBills, InsertNewBill } from "../services/bill.service";
import { useFocusEffect } from "expo-router";

export function useBillViewModel(profileId: string) {
    const [bills, setBills] = useState<Bill[] | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)

    const [hasMore, setHasMore] = useState(true)
    const pageRef = useRef(1)
    const loadingRef = useRef(false)

    const [addBillLoading, setAddBillLoading] = useState(false)
    const [createdBill, setCreatedBill] = useState<{ name: string; created_at: string } | null>(null)

    useFocusEffect(
        useCallback(() => {
            pageRef.current = 1
            setHasMore(true)
            setBills([])

            HandleBills(1)

        }, [])
    )

    async function HandleBills(pageToLoad: number) {
        loadingRef.current = true

        try {
            setError(null)
            setLoading(true)

            const data = await GetBills(profileId, pageToLoad)

            setBills(prev => [
                ...(prev ?? []),
                ...data
            ])

            if (data.length < 10) {
                setHasMore(false)
                return
            }

            pageRef.current = pageToLoad + 1

        } catch (exception) {
            setError(exception as Error)
        } finally {
            loadingRef.current = false
            setLoading(false)
        }
    }

    function loadNextPage() {
        if (!hasMore || loadingRef.current) return

        HandleBills(pageRef.current)
    }

    async function handleAddBill() {
        try {
            setAddBillLoading(true)
            const data = await InsertNewBill(profileId)
            setCreatedBill(data)
        } catch (exception: any) {
            console.log("Erro ao criar conta:", exception?.message)
        } finally {
            setAddBillLoading(false)
        }
    }

    function onDismissCreatedBill() {
        setCreatedBill(null)
    }

    return {
        bills,
        error,
        loading,
        HandleBills,
        loadNextPage,
        addBillLoading,
        createdBill,
        handleAddBill,
        onDismissCreatedBill,
    }
}
