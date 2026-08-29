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
        total_count: item.total_count,
        created_at: item.created_at,
        updated_at: item.updated_at,
        closed_at: item.closed_at
    }))
}