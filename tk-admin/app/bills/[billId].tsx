import { useLocalSearchParams, router } from "expo-router";
import BillDetailView from "@/src/view/BillDetailView";
import { useBillDetailViewModel } from "@/src/viewmodels/billDetail.viewmodel";

export default function BillDetailScreen() {
    const { billId, name, total, products_amount, closed_at } = useLocalSearchParams<{
        billId: string;
        name: string;
        total: string;
        products_amount: string;
        closed_at: string;
    }>();

    const model = useBillDetailViewModel(billId, closed_at)

    const onBack = () => router.back()

    return (
        <BillDetailView
            {...model}
            billName={name}
            billTotal={parseFloat(total)}
            billTotalCount={parseInt(products_amount)}
            billClosedAt={closed_at}
            onBack={onBack}
        />
    )
}
