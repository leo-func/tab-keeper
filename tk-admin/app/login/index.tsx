import LoginView from "@/src/view/LoginView";
import { useLoginViewModel } from "@/src/viewmodels/login.viewmodel";
import { router } from "expo-router";

export default function LoginScreen() {
  const model = useLoginViewModel({onLoginSuccess: () => router.push("/profiles")})

  return (
    <LoginView 
    {...model}
    />
  )
}
