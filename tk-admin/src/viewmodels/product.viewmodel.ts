import { useEffect, useRef, useState } from "react";
import { Product } from "../model/Product";
import { GetProducts } from "../services/product.service";

export function useProductViewModel() {
    const [products, setProducts] = useState<Product[] | null> (null)
    const [error, setError] = useState<Error | null> (null)
    const [loading, setLoading] = useState(false)


    const [hasMore, setHasMore] = useState(false)
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
            setError ( exception as Error)
        } finally {
            loadingRef.current = false
            setLoading(false)
        }
    }

    function loadNextPage() {
        if (!hasMore || loadingRef.current) return

        HandleProducts(pageRef.current)
    }

    return {
        products,
        error,
        loading,
        HandleProducts,
        loadNextPage
    }
}