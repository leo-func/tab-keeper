import CreateProfileView from "@/src/view/CreateProfileView";
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel";


export default function CreateProfileScreen() {
  const model = useProfileViewModel()

  return (
    <CreateProfileView {...model}/>
  )
}
