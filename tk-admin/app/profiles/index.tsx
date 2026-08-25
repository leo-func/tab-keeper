import ProfileView from "@/src/view/ProfileView";
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel";

export default function ProfilesScreen() {
  const model = useProfileViewModel()

  return (
    <ProfileView {...model}/>
  )
}
