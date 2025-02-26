import { createClient } from "./client_config"

export async function getProducts(){
    const supabase = await createClient()

    const products = await supabase.from('Product').select()
    console.log(products)
    return products
}