import LoginView from "@/src/view/LoginView";
import { useLoginViewModel } from "@/src/viewmodels/login.viewmodel";

export default function LoginScreen() {
  const model = useLoginViewModel()

  return (
    <LoginView {...model}/>
  )
}
