export function formatPrice(price: number) {
    return (price).toLocaleString("pt-Br", {minimumFractionDigits: 2})
}