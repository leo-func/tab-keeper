export function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
}

export function formatDateTime(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR") + " " + date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}
