export function formatCurrency(value: string): string {
    const numbers = value.replace(/\D/g, "")
    const amount = (parseInt(numbers) / 100).toFixed(2)
    const formatted = amount.replace(".", ",")
    return formatted
}

export function parseCurrency(value: string): number {
    const numericString = value.replace(",", ".")
    return parseFloat(numericString) || 0
}
