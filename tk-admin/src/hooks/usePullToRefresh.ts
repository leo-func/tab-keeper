import { useRef, useState } from "react";

export function usePullToRefresh() {
    const [refreshing, setRefreshing] = useState(false)
    const refreshingRef = useRef(false)


    async function handleRefresh(callback: () => Promise<void>) {
        if (refreshingRef.current) return

        refreshingRef.current = true
        setRefreshing(true)

        try {
            await callback()

        } finally {
            refreshingRef.current = false
            setRefreshing(false)
        }
    }

    return {
        refreshing,
        handleRefresh
    }
}