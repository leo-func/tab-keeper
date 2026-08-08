import { useState } from "react";
import { BillProduct } from "../model/billProduct.model";
import { getBillProducts } from "../services/bill.service";

export function useBillProducts() {
    const [billProducts, setBillProducts] = useState<BillProduct[] | null> (null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null> (null)

    async function HandleBillProducts(billId: string) {
        try {
            setLoading(true)
            setError(null)

            const data = await getBillProducts(billId)

            setBillProducts(data)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        billProducts,
        loading,
        error,
        HandleBillProducts
    }
}