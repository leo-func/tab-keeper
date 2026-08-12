import { useRouter } from "expo-router";
import { BillView } from "../../src/view/BillView";
import { useBillViewModel } from "../../src/viewmodels/bill.viewmodel";

export default function BillsScreen() {

  const router = useRouter();

  const viewModel = useBillViewModel();

  const goToDetails = (name: string, billId: string) => {
    router.push({
      pathname: '/bills/details',
      params: {
        billId,
        name,
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