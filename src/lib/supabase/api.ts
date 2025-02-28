import { createClient } from "./client_config"
import { Product, ProductMutation } from "@/interface"

const supabase = await createClient()


export async function getProducts(){
    try {
        const products = await supabase.from('Product').select().order('created_at', {ascending: false})
        return products
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}

export async function createProductz(product_name : string, product_category_id : number, description : string, sell_price : number, quantity : number){
    const productData : Product = {
        product_name,
        product_category_id,
        description,
        sell_price,
        quantity,
        is_active: true,
        created_at: new Date().toString()
    };

    // console.log(productData)

    const data = await supabase.from("Product").insert([productData]);

    // console.log("Product created:", productData);
    return data;
}

export async function createProduct({Product} : { Product:  ProductMutation}){
    try {
        const res = await supabase.from("Product").insert(Product)
        if (res){
            return { status:true, code: res.status, message: res.statusText };
        }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getCategories(){
    const categories = await supabase.from('Category').select()
    return categories
}