import CreateProfileView from "@/src/view/CreateProfileView";
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel";
import { router } from "expo-router";


export default function CreateProfileScreen() {
  const model = useProfileViewModel()

  return (
    <CreateProfileView 
    {...model}
    onBack={router.back}
    />
  )
}
