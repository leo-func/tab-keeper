import { useEffect, useRef, useState } from "react";
import { BillProduct } from "../model/billProduct.model";
import { getBillProducts } from "../services/bill.service";

export function useProductViewModel(billId: string) {
    const [billProducts, setBillProducts] = useState<BillProduct[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef(false);
    const pageRef = useRef(1);

    useEffect(() => {
        HandleBillProducts(billId, pageRef.current);
    }, [billId]);

    async function HandleBillProducts(billId: string, pageToLoad: number) {
        loadingRef.current = true;

        try {
            setLoading(true);
            setError(null);

            const data = await getBillProducts(billId, pageToLoad);

            setBillProducts(prev => [
            ...(prev ?? []),
            ...data
            ]);

            if (data.length < 10) {
                setHasMore(false)
                return
            }

            pageRef.current = pageToLoad + 1;
            

        } catch (exception) {
            setError(exception as Error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    }

    

    function loadNextPage() {
        if (!billId || loadingRef.current || !hasMore) return;

        HandleBillProducts(billId, pageRef.current);
    }

    return {
        billProducts,
        loading,
        error,
        HandleBillProducts,
        loadNextPage,
    };
}