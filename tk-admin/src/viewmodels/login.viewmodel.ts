import { useState } from "react";
import { useRouter } from "expo-router";
import { singIn } from "../services/login.service";

export function useLoginViewModel() {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [ error, setError ] = useState("")

    async function HandleLogin(email: string, password: string) {
        try {
            if (!email || !password) return

            setLoading(true)

            const data = await singIn(email, password)

            if (!data) {
                setError("E-mail ou senha incorreto")
                return
            }

            router.replace("/profiles")

        } catch (exception: any) {
            setError(exception)
        } finally {
            setLoading(false)
        }

    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        HandleLogin
    }
}