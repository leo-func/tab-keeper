import { Product } from "../model/Product";
import { supabase } from "../utils/createClient";

export async function GetProducts(page: number): Promise<Product[]> {
    const { data, error } = await supabase.rpc("get_products", {
        page: page
    })

    if (error) throw error

    return data.map((item: Product) => ({
        id: item.id,
        name: item.name,
        price: item.price
    }))
}