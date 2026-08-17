import { router, useLocalSearchParams } from "expo-router";

import { BillDetailsView } from "@/src/view/BillDetailsView";
import { useProductViewModel } from "@/src/viewmodels/products.viewmodel";

export default function BillDetailsScreen() {

  const { name, billId } = useLocalSearchParams<{ name: string, billId: string; }>();

  const viewModel = useProductViewModel(billId)

  return (
    <BillDetailsView 
      {...viewModel}
      onBack={router.back}
      name={name}
    />
  );
}