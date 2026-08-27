import { router, useLocalSearchParams } from "expo-router";
import EditProfileView from "@/src/view/EditProfileView";

export default function EditProfileScreen() {
    const { profileId } = useLocalSearchParams<{ profileId: string }>();

    return (
        <EditProfileView profileId={profileId} onBack={router.back} />
    )
}
