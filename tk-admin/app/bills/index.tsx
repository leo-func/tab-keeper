import { useLocalSearchParams, router } from "expo-router";
import BillView from "@/src/view/BillView";
import { useBillViewModel } from "@/src/viewmodels/bill.viewmodel";
import { Bill } from "@/src/model/Bill";

export default function BillsScreen() {
    const { profileId } = useLocalSearchParams<{ profileId: string }>();
    const model = useBillViewModel(profileId)

    const goToDetail = (bill: Bill) => {
        router.push({
            pathname: "/bills/[billId]",
            params: {
                billId: bill.id,
                name: bill.name,
                total: bill.total.toString(),
                total_count: bill.total_count.toString(),
                closed_at: bill.closed_at,
            },
        })
    }

    return (
        <BillView
            {...model}
            goToDetail={goToDetail}
        />
    )
}
