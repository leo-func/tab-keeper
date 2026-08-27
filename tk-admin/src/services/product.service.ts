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

export async function InsertNewProduct(price: number, name: string) {
    const { data, error } = await supabase.rpc("insert_new_product", {
        pr_price: price,
        pr_name: name
    }) 

    if (error) throw error

    return {
        name: data[0].name,
        price: data[0].price
    }
}