import { useState } from "react";
import { Product } from "../model/Product";
import { InsertNewProduct } from "../services/product.service";
import { formatCurrency, parseCurrency } from "../utils/currency";
import { ProductResponse } from "../model/ProductResponse";

export function useNewProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [createdProduct, setCreatedProduct] = useState<ProductResponse | null>(null)

    function handlePriceChange(value: string) {
        const formatted = formatCurrency(value)
        setPrice(formatted)
    }

    async function HandleNewProduct() {
        try {
            const priceNumber = parseCurrency(price)

            if (!name || !priceNumber) return

            setLoading(true)
            setError(null)

            const data = await InsertNewProduct(priceNumber, name)

            if (!data) {
                setError(data)
                return
            }

            setCreatedProduct(data)
            setName("")
            setPrice("")
        } catch (exception) {
            setError(exception as Error)
        } finally {
            setLoading(false)
        }
    }

    function onDismissCreated() {
        setCreatedProduct(null)
    }

    return {
        name,
        setName,
        price,
        handlePriceChange,
        loading,
        error,
        HandleNewProduct,
        createdProduct,
        onDismissCreated,
    }
}
