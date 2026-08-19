import { router, useLocalSearchParams } from "expo-router";

import { BillDetailsView } from "@/src/view/BillDetailsView";
import { useProductViewModel } from "@/src/viewmodels/products.viewmodel";

export default function BillDetailsScreen() {

  const { name, billId, total } = useLocalSearchParams<{ name: string, billId: string, total: string}>();

  const billTotal = Number(total)

  const viewModel = useProductViewModel(billId)

  return (
    <BillDetailsView 
      {...viewModel}
      onBack={router.back}
      name={name}
      total={billTotal}

    />
  );
}