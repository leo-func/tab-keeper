import ProfileView from "@/src/view/ProfileView";
import { useProfileViewModel } from "@/src/viewmodels/profile.viewmodel";
import { router, useLocalSearchParams } from "expo-router";

export default function ProfilesScreen() {
  const model = useProfileViewModel()

  const goToEdit = (profileId: string) => {
    router.push({
      pathname: "/profiles/edit/[profileId]",
      params: {
        profileId
      },
    })
  }

  return (
    <ProfileView 
    {...model}
    goToEdit={goToEdit}
    />
  )
}
