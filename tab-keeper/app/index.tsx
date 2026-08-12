import AccessView from "@/src/view/AccessView"
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel"

export default function Index() {
  const model = useProfileViewModel()

  return (
    <AccessView {...model}/>
  )
}
