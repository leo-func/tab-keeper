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

  const goToCreate = () => router.push("/profiles/create")

  const goToBills = (profileId: string) => {
    router.push({
      pathname: "/bills",
      params: {
        profileId
      },
    })
  }

  return (
    <ProfileView 
    {...model}
    goToEdit={goToEdit}
    goToCreate={goToCreate}
    goToBills={goToBills}
    />
  )
}
