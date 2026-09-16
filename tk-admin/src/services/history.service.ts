import { History } from "../model/History";
import { supabase } from "../utils/createClient";

export async function GetHistory(billId: string) : Promise<History[]> {
    const { data, error } = await supabase.rpc("get_bill_history", {
        b_id: billId
    })

    if (error) throw error

    return data.map((item: History) => ({
        product_name: item.product_name,
        amount: item.amount,
        added_at: item.added_at
    }))
}