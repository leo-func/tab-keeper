import { useState } from "react";
import { Product } from "../model/Product";
import { InsertNewProduct } from "../services/product.service";

export function useNewProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [createdProduct, setCreatedProduct] = useState<Product | null>(null)

    function formatCurrency(value: string): string {
        const numbers = value.replace(/\D/g, "")
        const amount = (parseInt(numbers) / 100).toFixed(2)
        const formatted = amount.replace(".", ",")
        return formatted
    }

    function handlePriceChange(value: string) {
        const formatted = formatCurrency(value)
        setPrice(formatted)
    }

    function getPriceAsNumber(): number {
        const numericString = price.replace(",", ".")
        return parseFloat(numericString) || 0
    }

    async function HandleNewProduct() {
        try {
            const priceNumber = getPriceAsNumber()

            if (!name || !priceNumber) return

            setLoading(true)
            setError("")

            const data = await InsertNewProduct(priceNumber, name)

            if (!data) {
                setError("Erro ao criar produto")
                return
            }

            setCreatedProduct(data)
            setName("")
            setPrice("")
        } catch (exception: any) {
            setError(exception?.message ?? "Erro ao criar produto")
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
