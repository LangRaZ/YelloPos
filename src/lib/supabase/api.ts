import { createClient } from "./client_config"
import { ProductMutation, UserMutation } from "@/interface"
import { Response } from "@/interface"

const supabase = createClient()


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


export async function createProduct(product: ProductMutation) : Promise<Response>{
    try {
        const res = await supabase.from("Product").insert(product)
        if (!res){
            return {status: false, code: 500, message: "Failed to create product"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function updateProduct(id: number, product: ProductMutation) : Promise<Response>{
    try {
        const res = await supabase.from("Product").update(product).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update product"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function deleteProduct(id: number) : Promise<Response>{
    try {
        const res = await supabase.from("Product").delete().eq("id", id)
        if(!res){
            return {status: false, code:500, message: "Failed to delete product"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getUser(){
    try {
        const user = await supabase.from('Accounts').select().order('created_at', {ascending: false})
        return user
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}


export async function createUser(user: UserMutation) : Promise<Response>{
    try {
        const User_res = await supabase.from("Accounts").insert(user)
        if (!User_res){
            return {status: false, code: 500, message: "Failed to create user"};
        }
        return { status:true, code: User_res.status, message: User_res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getCategories(){
    const categories = await supabase.from('Category').select()
    return categories
}

export async function getRoles(){
    const Roles = await supabase.from('Roles').select()
    return Roles
}