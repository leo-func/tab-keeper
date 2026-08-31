import { BillProduct } from "../model/BillProduct";
import { supabase } from "../utils/createClient";

export async function GetBillProducts(billId: string, page: number): Promise<BillProduct[]> {
    const { data, error } = await supabase.rpc("get_profile_bill_products", {
        b_id: billId,
        page: page,
    })

    if (error) throw error

    return data.map((item: BillProduct) => ({
        id: item.id,
        name: item.name,
        total_price: item.total_price,
        amount: item.amount
    }))
}

export async function InsertNewBillProduct(billId: string, productId: string, amount: number): Promise<void> {
    const { error } = await supabase.rpc("insert_new_bill_products", {
        b_id: billId,
        pr_id: productId,
        pr_amount: amount
    })

    if (error) throw error
}

export async function DeleteBillProduct(billProductId: string) {
    const { error } = await supabase.rpc("delete_bill_products", {
        bp_id: billProductId
    })

    if (error) throw error
}