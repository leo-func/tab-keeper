import { supabase } from "../utils/createClient";
import { BillProduct } from "../model/billProduct.model";
import { Bill } from "../model/bill.model";

export async function getBills(profileId: string): Promise<Bill[]> {
    const {data, error} = await supabase.rpc('get_bills', {
        pf_id: profileId,
    });
    
    if (error) { throw error; }

    return data.map((item: Bill) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        closed_at: item.closed_at,
        updated_at: item.updated_at,
        total: item.total
    }));
}

export async function getBillProducts(billId: string): Promise<BillProduct[]>  {
    const {data, error} = await supabase.rpc('get_bill_products', {
        b_id: billId
    })

    if (error) { throw error }
    
    return data.map((item: BillProduct) => ({
        name: item.name,
        amount: item.amount,
        total_price: item.total_price
    }));
}