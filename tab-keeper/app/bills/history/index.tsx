import { router, useLocalSearchParams } from "expo-router";

import { HistoryView } from "@/src/view/HistoryView";
import { useHistoryViewModel } from "@/src/viewmodels/history.viewmodel";

export default function HistoryScreen() {
  const { billId, name } = useLocalSearchParams<{ billId: string; name: string }>();

  const viewModel = useHistoryViewModel(billId)

  return (
    <HistoryView
      {...viewModel}
      billName={name}
      onBack={router.back}
    />
  )
}
