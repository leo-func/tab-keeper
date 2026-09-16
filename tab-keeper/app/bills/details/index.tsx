import { router, useLocalSearchParams } from "expo-router";

import { BillDetailsView } from "@/src/view/BillDetailsView";
import { useProductViewModel } from "@/src/viewmodels/products.viewmodel";

export default function BillDetailsScreen() {

  const { name, billId, total } = useLocalSearchParams<{ name: string, billId: string, total: string}>();

  const billTotal = Number(total)

  const viewModel = useProductViewModel(billId)

  const goToHistory = (billId: string, name: string) => {
    router.push({
      pathname: "/bills/history",
      params: {
        billId: billId,
        name: name
      }
    })
  }

  return (
    <BillDetailsView 
      {...viewModel}
      onBack={router.back}
      name={name}
      total={billTotal}
      billId={billId}
      goToHistory={goToHistory}
    />
  );
}