import { useEffect, useRef, useState } from "react";
import { Product } from "../model/Product";
import { GetProducts } from "../services/product.service";
import { usePullToRefresh } from "./usePullToRefresh";

export function useProduct() {
    const [products, setProducts] = useState<Product[] | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)

    const { refreshing, handleRefresh} = usePullToRefresh()

    const [hasMore, setHasMore] = useState(true)
    const pageRef = useRef(1)
    const loadingRef = useRef(false)

    useEffect(() => {
        HandleProducts(pageRef.current)
    }, [])

    async function HandleProducts(pageToLoad: number) {
        loadingRef.current = true

        try {
            setError(null)
            setLoading(true)

            const data = await GetProducts(pageToLoad)

            setProducts(prev => [
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

    async function HandleRefresh() {
        await handleRefresh(async () => {
            const data = await GetProducts(1)
            

            setProducts(data)
            setHasMore(data.length >= 10)
            pageRef.current = 2
        })
    }

    function loadNextPage() {
        if (!hasMore || loadingRef.current) return

        HandleProducts(pageRef.current)
    }

    return {
        products,
        error,
        loading,
        loadNextPage,
        HandleRefresh,
        refreshing
    }
}
