import { time } from "console";
import { createClient } from "./client_config"

const supabase = await createClient()

interface Product {
    product_name: string;
    product_category_id: number;
    description: string;
    sell_price: number;
    quantity: number;
    is_active: boolean;
    created_at: Date;
}

export async function getProducts(){
    const products = await supabase.from('Product').select()
    console.log(products)
    return products
}

export async function createProduct(product_name : string, product_category_id : number, description : string, sell_price : number, quantity : number){
    const productData : Product = {
        product_name,
        product_category_id,
        description,
        sell_price,
        quantity,
        is_active: true,
        created_at: new Date()
    };

    // console.log(productData)

    const data = await supabase.from("Product").insert([productData]);

    // console.log("Product created:", productData);
    return data;
}

export async function getCategory(){
    const categorys = await supabase.from('Category').select()
    console.log(categorys)
    return categorys
}