import { useEffect, useRef, useState } from "react";
import { Product } from "../model/Product";
import { GetProducts, SearchProducts } from "../services/product.service";
import { usePullToRefresh } from "./usePullToRefresh";
import { useDebounce } from "./useDebounce";

export function useProduct() {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const searchRef = useRef("")

    const { refreshing, handleRefresh} = usePullToRefresh()

    const [hasMore, setHasMore] = useState(true)
    const hasMoreRef = useRef(true)
    const pageRef = useRef(1)
    const loadingRef = useRef(false)

    useEffect(() => {
        HandleProducts(pageRef.current)
    }, [])

    useEffect(() => {
        searchRef.current = debouncedSearch
        setProducts([])
        setHasMore(true)
        hasMoreRef.current = true
        pageRef.current = 1
        HandleProducts(1)
    }, [debouncedSearch])

    async function HandleProducts(pageToLoad: number) {
        if (!hasMoreRef.current || loadingRef.current) return

        loadingRef.current = true

        try {
            setError(null)
            setLoading(true)

            const currentSearch = searchRef.current
            const data = currentSearch
                ? await SearchProducts(currentSearch, pageToLoad)
                : await GetProducts(pageToLoad)
            

            setProducts(prev => [
                ...prev,
                ...data
            ])

            if (data.length < 10) {
                setHasMore(false)
                hasMoreRef.current = false
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
            const currentSearch = searchRef.current
            const data = currentSearch
                ? await SearchProducts(currentSearch, 1)
                : await GetProducts(1)
            


            setProducts(data)
            setHasMore(data.length >= 10)
            hasMoreRef.current = data.length >= 10
            pageRef.current = 2
        })
    }

    function loadNextPage() {
        HandleProducts(pageRef.current)
    }

    function HandleSearch(value: string) {
        setSearch(value)
    }

    return {
        products,
        error,
        loading,
        loadNextPage,
        HandleRefresh,
        refreshing,
        search,
        HandleSearch
    }
}
