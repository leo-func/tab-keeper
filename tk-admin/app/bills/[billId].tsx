import { useLocalSearchParams, router } from "expo-router";
import BillDetailView from "@/src/view/BillDetailView";

export default function BillDetailScreen() {
    const { billId, name, total, total_count, closed_at } = useLocalSearchParams<{
        billId: string;
        name: string;
        total: string;
        total_count: string;
        closed_at: string;
    }>();

    const onBack = () => router.back()

    const onCloseBill = () => {}

    const onDeleteBill = () => router.back()

    return (
        <BillDetailView
            billId={billId}
            billName={name}
            billTotal={parseFloat(total)}
            billTotalCount={parseInt(total_count)}
            billClosedAt={closed_at}
            onBack={onBack}
            onCloseBill={onCloseBill}
            onDeleteBill={onDeleteBill}
        />
    )
}
