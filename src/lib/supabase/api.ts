import { createClient } from "./client_config"
import { ProductMutation, UserMutation ,CategoryMutation, AuthRegister, AuthMutation,BusinessMutation, Auth, TransactionMutation, TransactionsResponse, ProductMutationImage, BusinessProfileMutation, OrderMutation } from "@/interface"
import { Response, ProductsResponse, ProductResponse, UserResponse, CategoryResponse } from "@/interface"

const supabase = createClient()


export async function getProducts() : Promise<ProductsResponse>{
    try {
        const products = await supabase.from('Product').select('*, Category:product_category_id(category_name)').order('created_at', {ascending: false})
        if(!products.data){
            return {status:false, code:200, message: products.statusText, data: products.data};
        }
        return {status:true, code:200, message: products.statusText, data: products.data};
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}

export async function getProduct(id: number) : Promise<ProductResponse>{
    try {
        const product = await supabase.from("Product").select("*, Category:product_category_id(category_name)").eq("id", id).single()
        if(!product.data){
            return {status:false, code:200, message: product.statusText, data: product.data};
        }
        return {status:true, code:200, message: product.statusText, data: product.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

async function UploadFileSupabase(File: File, imagePath: string){
    try {
        const res = await supabase
        .storage
        .from('product-image')
        .upload(imagePath, File, {
            cacheControl: '0',
            upsert: false
        })
        return res;
    } catch (error) {
        return null;
    }
}

async function deleteFileSupabase(path: string){
    try {
        const res = await supabase.storage.from('product-image').remove([path])
        console.log(`sukses delete ${path}`)
        return res;
    } catch (error) {
        return null;
    }
}


export async function createProduct(product: ProductMutationImage) : Promise<Response>{
    if (!product.product_name || !product.product_category_id) {
        return { status: false, code: 400, message: "Product name and Product category is required" };
    }

    const checkUnique = await checkUniqueProduct(product.product_name, product.product_category_id);
    const getCategoryName = await getCategory(product.product_category_id);

    if (checkUnique.status == true) {
        return {status: false, code: 500, message: checkUnique.data?.product_name + " with " + getCategoryName.data?.category_name + " already exists"};
    }
    
    const unixTimestamp = Math.floor(Date.now() / 1000);
    
    const productSup:ProductMutation = {
        product_name: product.product_name,
        product_category_id : product.product_category_id,
        product_image : "",
        description : product.description,
        sell_price : product.sell_price,
        quantity : product.quantity,
        is_active: product.is_active,
        last_image_update: `${unixTimestamp}`,
    }


    try {
        const res = await supabase.from("Product").insert(productSup).select().single()
        if (!res){
            return {status: false, code: 500, message: "Failed to create product"};
        }
        if(res.data){
            const product_image_name = `product-id${res.data.id}${unixTimestamp}`
            const supabaseImagePath = `${product_image_name}.${product.product_image.type.split("/").pop()}`

            const uploadedFile = await UploadFileSupabase(product.product_image, supabaseImagePath)
            if(!uploadedFile){
                return {status: true, code: 202, message: "Product has been added successfully but failed to upload product image"}
            }
            const fileSupabaseURL = supabase.storage.from('product-image').getPublicUrl(supabaseImagePath)
            if(!fileSupabaseURL){
                return {status: true, code: 202, message: "Product has been added successfully but failed to save product image"}
            }
            const resUpdate = await supabase.from('Product').update({product_image: `${fileSupabaseURL.data.publicUrl}`}).eq("id", res.data.id)
            if (!resUpdate){
                return {status: true, code: 202, message: "Product has been added successfully but failed to save product image"}
            }
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function updateProduct(id: number, product: ProductMutationImage, oldProductImageURL: string , oldProductImageExt: string, isDiffExt: boolean) : Promise<Response>{

    const unixTimestamp = Math.floor(Date.now() / 1000);
    
    const productSup:ProductMutation = {
        product_name: product.product_name,
        product_category_id : product.product_category_id,
        product_image : oldProductImageURL,
        description : product.description,
        sell_price : product.sell_price,
        quantity : product.quantity,
        is_active: product.is_active,
        last_image_update: `${unixTimestamp}`,
    }

    const supabaseImagePath = `product-id${id}${unixTimestamp}.${product.product_image.type.split("/").pop()}`
    const supabaseOldImagePath = `product-id${id}${product.last_image_update}.${oldProductImageExt}`

    try {
        const delRes = await deleteFileSupabase(supabaseOldImagePath)
        const fileRes = await UploadFileSupabase(product.product_image, supabaseImagePath)
        const fileSupabaseURL = supabase.storage.from('product-image').getPublicUrl(supabaseImagePath)
        productSup.product_image = fileSupabaseURL.data.publicUrl

        const res = await supabase.from("Product").update(productSup).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update product"};
        }

        return { status:true, code: res.status, message: "Product has been updated successfully!" };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function deleteProduct(id: string) : Promise<Response>{
    try {
        const res = await supabase.from("Product").delete().eq("id", Number(id))
        if(!res){
            return {status: false, code:500, message: "Failed to delete product"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function checkUniqueProduct(name: string, categoryId: number) : Promise<ProductResponse>{
    try {
        const product = await supabase.from("Product").select("*, Category:product_category_id(category_name)").eq("product_name", name).eq("product_category_id", categoryId).single()
        console.log(product)
        if(!product.data){
            console.log(false)
            return {status:false, code:200, message: product.statusText, data: product.data};
        }
        return {status:true, code:200, message: product.statusText, data: product.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
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

export async function updateUser(id: string, user: UserMutation) : Promise<Response>{
    try {
        const res = await supabase.from("Accounts").update(user).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update User"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getCategories(){
    const categories = await supabase.from('Category').select().order('created_at', {ascending: false})
    return categories
}

export async function getRoles(){
    const Roles = await supabase.from('Roles').select()
    return Roles
}

//Get User ID Single
export async function getusers(id: string) : Promise<UserResponse>{
    try {
        const user = await supabase.from("Accounts").select("*").eq("id", id).single()
        if(!user.data){
            return {status:false, code:200, message: user.statusText, data: user.data};
        }
        return {status:true, code:200, message: user.statusText, data: user.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

export async function deleteUser(id: string) : Promise<Response>{
    try {
        const res = await supabase.from("Accounts").delete().eq("id",id)
        if(!res){
            return {status: false, code:500, message: "Failed to delete User"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Category
export async function updateCategory(id: number, Category: CategoryMutation) : Promise<Response>{
    try {
        const res = await supabase.from("Category").update(Category).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update category"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function createCategory(Category: CategoryMutation) : Promise<Response>{
    if (!Category.category_name) {
        return { status: false, code: 400, message: "Category name is required" };
    }

    const check = await checkUniqueCategory(Category.category_name);

    if (check.status == true) {
        return {status: false, code: 500, message: check.data?.category_name + " already exists"};
    }

    try {
        const res = await supabase.from("Category").insert(Category)
        if (!res){
            return {status: false, code: 500, message: "Failed to create Category"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getCategory(id: number) : Promise<CategoryResponse>{
    try {
        const category = await supabase.from("Category").select("*").eq("id", id).single()
        if(!category.data){
            return {status:false, code:200, message: category.statusText, data: category.data};
        }
        return {status:true, code:200, message: category.statusText, data: category.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

export async function checkUniqueCategory(name: string) : Promise<CategoryResponse>{
    try {
        const category = await supabase.from("Category").select("*").eq("category_name", name).single()
        if(!category.data){
            return {status:false, code:200, message: category.statusText, data: category.data};
        }
        return {status:true, code:200, message: category.statusText, data: category.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

export async function deleteCategory(id: string) : Promise<Response>{
    try {
        const res = await supabase.from("Category").delete().eq("id", Number(id))
        if(!res){
            return {status: false, code:500, message: "Failed to delete category"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Transaction
export async function updateTransaction(id: number, Transaction: TransactionMutation) : Promise<Response>{
    try {
        const res = await supabase.from("Order").update(Transaction).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update transaction"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getTransactions() : Promise<TransactionsResponse>{
    try {
        const transactions = await supabase.from('Order').select('*').order('created_at', {ascending: false})
        if(!transactions.data){
            return {status:false, code:200, message: transactions.statusText, data: transactions.data};
        }
        return {status:true, code:200, message: transactions.statusText, data: transactions.data};
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}


//Auth
export async function createAuthUser(user: AuthMutation) : Promise<Response>{   
    const AuthUser: AuthRegister = {
        email: user.email,
        password: user.password,
        options: {
            data: {
                name: user.name,
                phone_number: user.phone_number,
                first_login: true
            }
        }
    };

    try {
        const {error} = await supabase.auth.signUp(AuthUser)
        if(!error){
            return { status: true, code: 200, message:"Account registered successfully" }
        }
        return { status: false, code: 500, message: error.message }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

export async function signInAuthUser(authUser: Auth) : Promise<Response>{
    try {
        const {error} = await supabase.auth.signInWithPassword(authUser);
        if(!error){
            return { status: true, code: 200, message:"Account logged in successfully" }
        }
        return { status: false, code: 500, message: error.message }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

export async function signOutAuthUser() : Promise<Response>{
    try {
        const {error} = await supabase.auth.signOut();
        if(!error){
            return { status: true, code: 200, message:"Account logged out successfully" }
        }
        return { status: false, code: 500, message: error.message } 
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

export async function createBusiness(business: BusinessMutation) : Promise<Response>{
    try {
        const business_res = await supabase.from("BusinessProfile").insert(business)
        if (!business_res){
            return {status: false, code: 500, message: "Failed to create user"};
        }
        return { status:true, code: business_res.status, message: business_res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Business Profile
export async function updateBusinessProfile(id: number, BusinessProfile: BusinessProfileMutation) : Promise<Response>{
    try {
        const res = await supabase.from("BusinessProfile").update(BusinessProfile).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update Business Profile"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Order
export async function createOrder(order: OrderMutation) : Promise<Response>{
    try {
        return {status: true, code: 200, message:""}
    }
    catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}