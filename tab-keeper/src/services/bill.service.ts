import { supabase } from "../utils/createClient";
import { BillProduct } from "../model/billProduct.model";
import { Bill } from "../model/bill.model";

export async function getBills(page: number): Promise<Bill[]> {
    const { data, error } = await supabase.rpc("get_bills", {
        page: page
    });


    if (error) {
        throw error;
    }

    console.log(data)
    console.log(error)
    
    return data.map((item: Bill) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        closed_at: item.closed_at,
        updated_at: item.updated_at,
        total: item.total
    }));
}

export async function searchBills(query: string, page: number) {
    const { data, error} = await supabase.rpc("search_bills", {
        query: query,
        page: page
    })

    if (error) {
        throw error
    }

    return data.map((item: Bill) => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        closed_at: item.closed_at,
        updated_at: item.updated_at,
        total: item.total
    }))
}

export async function getBillProducts(billId: string, page: number): Promise<BillProduct[]>  {
    const {data, error} = await supabase.rpc('get_bill_products', {
        b_id: billId,
        page: page
    })

    console.log(data)

    if (error) { throw error }
    
    return data.map((item: BillProduct) => ({
        name: item.name,
        amount: item.amount,
        total_price: item.total_price
    }));
}