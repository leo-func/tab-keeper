import { useLocalSearchParams, router } from "expo-router";
import HistoryView from "@/src/view/HistoryView";
import { useHistoryViewmodel } from "@/src/viewmodels/history.viewmodel";

export default function HistoryScreen() {
    const { billId } = useLocalSearchParams<{ billId: string; }>();

    const model = useHistoryViewmodel(billId)

    const onBack = () => router.back()

    return (
        <HistoryView
            {...model}
            onBack={onBack}
        />
    )
}
