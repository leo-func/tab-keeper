import { useRouter } from "expo-router";
import { BillView } from "../../src/view/BillView";
import { useBillViewModel } from "../../src/viewmodels/bill.viewmodel";

export default function BillsScreen() {

  const router = useRouter();

  const viewModel = useBillViewModel();

  const goToDetails = (name: string, billId: string, total: string) => {
    router.push({
      pathname: '/bills/details',
      params: {
        billId,
        name,
        total
      },
    });
  };

  return (
    <BillView
      {...viewModel}
      goToDetails={goToDetails}
    />
  )
}