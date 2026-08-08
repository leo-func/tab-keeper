import { useState } from "react";
import { Bill } from "../model/bill.model";
import { getBills } from "../services/bill.service";
import { useBillProducts } from "../hooks/useBillProducts";

export function useBillViewModel() {
    const { billProducts, HandleBillProducts, loading: loadingBillProducts, error: errorBillProducts } = useBillProducts()
    const [bills, setBills] = useState<Bill[] | null> (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null> (null)

    async function HandleBills(profileId: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getBills(profileId)

            setBills(data)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        bills,
        loading,
        error,
        HandleBills,

        billProducts,
        loadingBillProducts,
        errorBillProducts,
        HandleBillProducts,
    }
}