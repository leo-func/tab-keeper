import { useEffect, useState } from "react";

export function useDebounce(value: string, delay = 800) {
    const [debouncedSearch, setDebouncedSearch] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(value)
        }, delay)

        return () => clearTimeout(timeout)
    })

    return debouncedSearch
}