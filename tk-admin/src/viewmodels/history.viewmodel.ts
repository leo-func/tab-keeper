import { useEffect, useState } from "react";
import { History } from "../model/History";
import { GetHistory } from "../services/history.service";

export function useHistoryViewmodel(billId: string) {
    const [history, setHistory] = useState<History[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        HandleHistory()
    }, [])

    async function HandleHistory() {
        try {
            setError(null)
            setLoading(true)
            const data = await GetHistory(billId)
            setHistory(data)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        history,
        loading,
        error,
    }
}
