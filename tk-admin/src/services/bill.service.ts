import { Bill } from "../model/Bill";
import { supabase } from "../utils/createClient";

export async function GetBills(profileId: string, page: number) : Promise<Bill[]> {
    const { data, error} = await supabase.rpc("get_bills", {
        pf_id: profileId,
        page: page
    })

    if (error) throw error

    return data.map((item: Bill) => ({
        id: item.id,
        name: item.name,
        total: item.total,
        products_amount: item.products_amount,
        prepaid_amount: item.prepaid_amount,
        created_at: item.created_at,
        updated_at: item.updated_at,
        closed_at: item.closed_at
    }))
}

export async function InsertNewBill(profileId: string) {
    const { data, error } = await supabase.rpc("insert_new_bills", {
        p_id: profileId
    })

    if (error) throw error

    return {
        name: data[0].name,
        created_at: data[0].created_at
    }
}

export async function OpenBill(billId: string) {
    const { error } = await supabase.rpc("open_bill", {
        bill_id: billId
    })

    if (error) throw error    
}

export async function CloseBill(billId: string) {
    const { error } = await supabase.rpc("close_bill", {
        bill_id: billId
    })

    if (error) throw error
}

export async function DeleteBill(billId: string) {
    const { error} = await supabase.rpc("delete_bill", {
        b_id: billId 
    })

    if (error) throw error
}