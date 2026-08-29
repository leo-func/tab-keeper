import { useEffect, useRef, useState } from "react";
import { BillProduct } from "../model/BillProduct";
import { GetBillProducts } from "../services/bill_product.service";

export function useBillProduct(billId: string) {
    const [billProducts, setBillProducts] = useState<BillProduct[] | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)

    const [hasMore, setHasMore] = useState(true)
    const pageRef = useRef(1)
    const loadingRef = useRef(false)

    useEffect(() => {
        HandleBillProducts(pageRef.current)
    }, [])

    async function HandleBillProducts(pageToLoad: number) {
        loadingRef.current = true

        try {
            setError(null)
            setLoading(true)


            const data = await GetBillProducts(billId, pageToLoad)

            setBillProducts(prev => [
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

        HandleBillProducts(pageRef.current)
    }

    return {
        billProducts,
        error,
        loading,
        loadNextPage,
    }
}
