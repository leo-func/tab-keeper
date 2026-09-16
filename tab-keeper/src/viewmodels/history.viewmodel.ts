import { useEffect, useState } from "react";
import { History } from "../model/history.model";
import { getHistory } from "../services/history.service";

export function useHistoryViewModel(billId: string) {
    const [history, setHistory] = useState<History[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        handleHistory()
    }, [])

    async function handleHistory() {
        try {
            setError(null)
            setLoading(true)
            const data = await getHistory(billId)
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
