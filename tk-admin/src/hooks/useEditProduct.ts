import { useState } from "react";
import { UpdateProduct, DeleteProduct } from "../services/product.service";
import { formatCurrency, parseCurrency } from "../utils/currency";

export function useEditProduct(productId: string, initialName?: string) {
    const [name, setName] = useState(initialName ?? "")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    function handlePriceChange(value: string) {
        const formatted = formatCurrency(value)
        setPrice(formatted)
    }

    async function HandleUpdate() {
        try {
            const priceNumber = parseCurrency(price)

            if (!name.trim() || !priceNumber) return

            setLoading(true)
            setError(null)

            await UpdateProduct(productId, name.trim(), priceNumber)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    async function HandleDelete() {
        try {
            setLoading(true)
            setError(null)

            await DeleteProduct(productId)
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    return {
        name,
        setName,
        price,
        handlePriceChange,
        loading,
        error,
        HandleUpdate,
        HandleDelete,
    }
}
