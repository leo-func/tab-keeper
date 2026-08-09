import AccessView from "@/src/view/AccessView"
import { useBillViewModel } from "@/src/viewmodels/bill.viewmodel"
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel"

export default function Index() {
  const model = useProfileViewModel()

  return (
    <AccessView {...model}/>
  )
}
