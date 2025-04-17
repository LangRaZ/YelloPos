import { createClientBrowser } from "./client_config"
import { ProductMutation, UserMutation ,CategoryMutation, AuthRegister, AuthMutation,BusinessMutation, Auth, TransactionsResponse, ProductMutationImage, BusinessProfileMutation, OrderMutation, OrderDetailMutation, BusinessProfileImage, BusinessProfileResponse, TaxMutation, TaxProfileResponse, TransactionResponse, OrderDetailsResponse, ReportsResponse, AuthNewUser, ReportMutation } from "@/interface"
import { Response, ProductsResponse, ProductResponse, UserResponse, CategoryResponse, User } from "@/interface"
import { generateCode } from "../utils"
import { updateAuthUser, getUserBusinessProfileId, updateAuthTax} from "./api_server"
import supabaseAdmin from "./admin_config"

const supabase = createClientBrowser()

export async function getProducts() : Promise<ProductsResponse>{
    try {
        // const userClient = await getUserBusinessProfileId()
        // console.log(userClient)
        const products = await supabase.from('Product').select('*, Category:product_category_id(category_name)').eq('business_profile_id', await getUserBusinessProfileId()).order('created_at', {ascending: false})
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


async function UploadFileSupabaseBusinessProfile(File: File, imagePath: string){
    try {
        const res = await supabase
        .storage
        .from('business-image')
        .upload(imagePath, File, {
            cacheControl: '0',
            upsert: false
        })
        return res;
    } catch (error) {
        return null;
    }
}

async function deleteFileSupabaseBusinessProfile(path: string){
    try {
        const res = await supabase.storage.from('business-image').remove([path])
        console.log(`sukses delete ${path}`)
        return res;
    } catch (error) {
        return null;
    }
}

async function deleteFileSupabaseBusinessQR(path: string){
    try {
        const res = await supabase.storage.from('bank-qr').remove([path])
        console.log(`sukses delete ${path}`)
        return res;
    } catch (error) {
        return null;
    }
}

async function UploadFileSupabaseBusinessQR(File: File, imagePath: string){
    try {
        const res = await supabase
        .storage
        .from('bank-qr')
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
        return {status: false, code: 500, message: checkUnique.data?.product_name + " with Category " + getCategoryName.data?.category_name + " already exists"};
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
        business_profile_id: await getUserBusinessProfileId()
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
        business_profile_id: await getUserBusinessProfileId()
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
        const product = await supabase.from("Product").select("*, Category:product_category_id(category_name)").eq("product_name", name)
        .eq("product_category_id", categoryId).eq("business_profile_id", await getUserBusinessProfileId()).single()
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


export async function getUsers(){
    try {
        const bpid = await getUserBusinessProfileId();
        if(!bpid){
            return { status:false, code: 500, message: "Failed to get users", data: null };
        }

        const user = await supabase.from('Accounts').select('*, Role:role_id(role_name)').eq('business_profile_id', bpid).order('created_at', {ascending: false})
        if(user.error){
            return { status:false, code: 500, message: "Failed to get users", data: null };
        }
        return { 
            status:true, code: 200, message: user.statusText, data: user.data
        };
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}


export async function createUser(user: UserMutation, password: string) : Promise<Response>{
    try {
        const bpid = await getUserBusinessProfileId();
        if(!bpid){
            return { status:false, code: 500, message: "Failed to create user" };
        }
        
        const AuthUser: AuthNewUser = {
            email: user.email,
            password: password,
            user_metadata: {
                name: user.name,
                phone_number: user.phone_number,
                username: user.username,
                first_login: false,
                first_setup_tax: false,
                role_id: user.role_id,
                business_profile_id: bpid
            },
            email_confirm: true
        };
        user.business_profile_id = bpid

        const {data, error} = await supabaseAdmin.auth.admin.createUser(AuthUser)
        if(error){
            return {status: false, code: 500, message: "Failed to create user"};
        }

        const userSB: User = {
            id: data.user?.id!,
            email: user.email,
            name: user.name,
            username: user.username,
            phone_number: user.phone_number,
            business_profile_id: user.business_profile_id,
            role_id: user.role_id
        }

        const User_res = await supabase.from("Accounts").insert(userSB)
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
    const categories = await supabase.from('Category').select().eq('business_profile_id', await getUserBusinessProfileId()).order('created_at', {ascending: false})
    return categories
}

export async function getCategoriesWithProductsCount(){
    const test = await getUserBusinessProfileId()
    const categories = await supabase.rpc("get_categories_with_product_count2", { businessprofileid : test })
    return categories
}

export async function getRoles(){
    const Roles = await supabase.from('Roles').select()
    return Roles
}

//Get User ID Single
export async function getUser(id: string) : Promise<UserResponse>{
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

export async function getUserByEmail(email: string) : Promise<UserResponse>{
    try {
        const user = await supabase.from("Accounts").select("*").eq("email", email).single()
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
    if (!Category.category_name) {
        return { status: false, code: 400, message: "Category name is required" };
    }

    const check = await checkUniqueCategory(Category.category_name);

    if (check.status == true) {
        return {status: false, code: 500, message: check.data?.category_name + " already exists"};
    }

    Category.business_profile_id = await getUserBusinessProfileId()

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

    Category.business_profile_id = await getUserBusinessProfileId()
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
        const category = await supabase.from("Category").select("*").eq("category_name", name).eq("business_profile_id", await getUserBusinessProfileId()).single()
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
export async function processTransaction(id: number, processedByID: string) : Promise<Response>{
    const currentTimestamptz = new Date().toISOString();

    try {
        const refetchRes = await supabase.from('Order').select('processed_by_account_id').eq('id', id).single()
        if(refetchRes.error){
            return {status: false, code: 500, message: "Failed to fetch transaction data"};
        }
        else if(refetchRes.data.processed_by_account_id === null || refetchRes.data.processed_by_account_id === processedByID){
            const res = await supabase.from('Order').update({processed_by_account_id: processedByID, processed_time: currentTimestamptz, transaction_status: "In-Process"}).eq('id', id)
            if(res.error){
                console.log(res)
                return {status: false, code: 500, message: "Failed to process transaction"};
            }
    
            return { status:true, code: res.status, message: res.statusText };
        }
        return {status: false, code: 401, message: "Transaction has been processed by another user!"};
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}


export async function completeTransaction(id: number, paymentMethod: string) : Promise<Response>{
    const currentTimestamptz = new Date().toISOString();

    try {
        const res = await supabase.from("Order").update({'payment_method': paymentMethod, 'completed_time': currentTimestamptz, transaction_status: "Completed"}).eq("id", id)
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
        const bp_id = await getUserBusinessProfileId()
        console.log(bp_id)

        const transactions = await supabase.from('Order').select('*').eq('business_profile_id', bp_id).order('created_at', {ascending: false})
        if(!transactions.data){
            return {status:false, code:200, message: transactions.statusText, data: transactions.data};
        }
        return {status:true, code:200, message: transactions.statusText, data: transactions.data};
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", data:null
        };
    }
}

export async function getTransactionById(id: number) : Promise<TransactionResponse>{
    try {
        const res = await supabase.from('Order').select('*').eq('id', id).single()
        if(res.error){
            return {status:false, code:500, message: res.statusText, data: res.data};
        }

       return { status: true, code: 200, message: res.statusText, data: res.data }
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", data:null
        };
    }
}

export async function getOrderDetailsbyOrderId(orderId: number) : Promise<OrderDetailsResponse>{
    try {
        const res = await supabase.from('OrderDetail').select('*, product_detail:product_id(product_name)').eq('order_id', orderId)
        
        if(res.error){
            return {status:false, code:500, message: res.statusText, data: res.data};
        }
        return { status: true, code: 200, message: res.statusText, data: res.data }
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", data:null
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
                username: null,
                first_login: true,
                first_setup_tax: true,
                role_id: 1,
                business_profile_id: null
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
        const res = await supabase.from("BusinessProfile").insert(business).select().single()
        
        if (res.error){
            return {status: false, code: 500, message: "Failed to create business profile"};
        }

        if(res.data){
            const id = res.data.id
            const code = generateCode("B", res.data.id)
            const business_res = await supabase.from("BusinessProfile").update({code: code}).eq('id', id)

            const updateAccount_res = await updateAuthUser(false, id)
            if(!updateAccount_res){
                return {status: false, code: 500, message: "Failed to update account business profile"};
            }
        }
        
        return { status:true, code: res.status, message: "Business profile has been completed!" };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Business Profile
export async function getBusinessProfile(id: number) : Promise<BusinessProfileResponse>{
    try {
        const Business_id = await supabase.from("BusinessProfile").select("*").eq("id", id).single()
        if(!Business_id.data){
            return {status:false, code:200, message: Business_id.statusText, data: Business_id.data};
        }
        return {status:true, code:200, message: Business_id.statusText, data: Business_id.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

export async function updateBusinessProfile(id: number, BusinessProfile: BusinessProfileImage,OldBusinessImageURL:string,oldBusinessImageExt:string,OldQRImageURL:string,OldQRImageExt:string) : Promise<Response>{
    const unixTimestamp = Math.floor(Date.now()/1000);

    const businessSup:BusinessProfileMutation={
        id: BusinessProfile.id,
        address: BusinessProfile.address,
        bank_account_name: BusinessProfile.bank_account_name,
        bank_account_number: BusinessProfile.bank_account_number,
        business_name: BusinessProfile.business_name,
        code: BusinessProfile.code,
        email: BusinessProfile.email,
        phone_number: BusinessProfile.phone_number,
        profile_image_url : OldBusinessImageURL,
        last_profile_update : `${unixTimestamp}`,
        qr_image_url : OldQRImageURL,
        last_qr_update:`${unixTimestamp}`,
    }

    const supabaseProfileImagePath = `business_profile_id${id}${unixTimestamp}.${BusinessProfile.profile_image_url.type.split("/").pop()}`
    const supabaseOldprofileImagePath = `business_profile_id${id}${BusinessProfile.last_profile_update}.${oldBusinessImageExt}`

    const supabaseProfileQrPath = `business_profile_id${id}${unixTimestamp}.${BusinessProfile.qr_image_url.type.split("/").pop()}`
    const supabaseOldprofileQrPath = `business_profile_id${id}${BusinessProfile.last_qr_update}.${OldQRImageExt}`
    try {
        const delRes = await deleteFileSupabaseBusinessProfile(supabaseOldprofileImagePath)
        const fileRes = await UploadFileSupabaseBusinessProfile(BusinessProfile.profile_image_url,supabaseProfileImagePath)
        const fileSupabaseURL = supabase.storage.from('business-image').getPublicUrl(supabaseProfileImagePath)    
        businessSup.profile_image_url = fileSupabaseURL.data.publicUrl

        const delResQr = await deleteFileSupabaseBusinessQR(supabaseOldprofileQrPath)
        const fileResQr = await UploadFileSupabaseBusinessQR(BusinessProfile.qr_image_url,supabaseProfileQrPath)
        const fileSupabaseURLQr = supabase.storage.from('bank-qr').getPublicUrl(supabaseProfileQrPath)    
        businessSup.qr_image_url = fileSupabaseURLQr.data.publicUrl

        const res = await supabase.from("BusinessProfile").update(businessSup).eq("id", id)
        if (!res){
            return {status: false, code: 500, message: "Failed to update Business Profile"};
        }
        return { status:true, code: res.status, message: res.statusText };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Order
export async function createOrderDetails(orderDetails: OrderDetailMutation[]): Promise<Response>{
    try {
        const res = await supabase.from('OrderDetail').insert(orderDetails)
        if(!res){
            return {status: false, code: 500, message:"Failed to create order details"}
        }

        for (let index = 0; index < orderDetails.length; index++) {
            const res = await supabase.rpc("update_product_stock", {orderquantity: orderDetails[index].quantity, orderproductid: orderDetails[index].product_id})
            // console.log("quantity : " + orderDetails[index].quantity + ", product id : " + orderDetails[index].product_id)
            // console.log(res)
        }
        
        return {status: true, code: 200, message: res.statusText}
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function createOrder(order: OrderMutation) : Promise<Response>{
    try {
        OrderValidation(order)

        const {data, error} = await supabase.from('Order').insert({
            total_payment: order.total_price,
            business_profile_id: order.business_profile_id,
        }).select().single()

        if(data && !error){
            const orderDetails: OrderDetailMutation[] = order.OrderDetail.map(items => ({
                product_id: items.product.id,
                order_id: data.id,
                quantity: items.quantity,
                total_price: items.total_price
            }))
            
            const resDetails = await createOrderDetails(orderDetails)
            if(resDetails.status){
                return {status: true, code: 200, message: "Order has been confirmed!"}
            }
            return {status: false, code: 500, message: "Failed to create order details"}
        }

        return {status: false, code: 400, message:"Failed to confirm order"}
    }
    catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function cancelOrder(id: string) : Promise<Response>{
    try {
        const res = await supabase.from('Order').update({transaction_status: "Cancelled"}).eq('id', Number(id))

        if(!res || res.error){
            return {status: false, code: 500, message:"Failed to cancel order"}
        }

        return {status: true, code: res.status, message:"Order has been cancelled!"}
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

//Tax
export async function createTaxProfile(tax: TaxMutation) : Promise<Response>{
    try {
        tax.business_profile_id = await getUserBusinessProfileId();
        const res = await supabase.from("Tax Module").insert(tax)
        
        if (res.error){
            return {status: false, code: 500, message: "Failed to create tax profile"};
        }

        if(res.data){
            const updateTax_res = await  updateAuthTax(false)
            if(!updateTax_res){
                return {status: false, code: 500, message: "Failed to update tax"};
            }
        }
        return { status:true, code: res.status, message: "Tax profile has been completed!" };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getTaxProfile(id: number) : Promise<TaxProfileResponse>{
    try {
        const tax_id = await supabase.from("Tax Module").select("*").eq("id", id).single()
        if(!tax_id.data){
            return {status:false, code:200, message: tax_id.statusText, data: tax_id.data};
        }
        return {status:true, code:200, message: tax_id.statusText, data : tax_id.data};

    } catch (error) {
        return {
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        }
    }
}

export async function saveReport(report: ReportMutation, excelFile: File) : Promise<Response>{
    const reportSup: ReportMutation = {
        report_url: "",
        business_profile_id: await getUserBusinessProfileId(),
        is_monthly: report.is_monthly,
        is_yearly: report.is_yearly,
        month: report.month,
        year: report.year
    }

    // console.log("File info:", {
    //     name: excelFile.name,
    //     type: excelFile.type,
    //     size: excelFile.size
    //   });

    try {
        const res = await supabase.from("Report").insert(reportSup).select().single()
        
        if (res.error){
            return {status: false, code: 500, message: "Failed to save report"};
        }

        if (res.data){
            const report_name = excelFile.name
            const supabaseReportPath = `${report_name}.xlsx`

            const uploadedFile = await UploadReportSupabase(excelFile, supabaseReportPath)
            if(!uploadedFile){
                return {status: true, code: 202, message: "Report has been added successfully but failed to upload Report"}
            }
            const fileSupabaseURL = supabase.storage.from('report').getPublicUrl(supabaseReportPath)
            if(!fileSupabaseURL){
                return {status: true, code: 202, message: "Report has been added successfully but failed to save Report"}
            }
            const resUpdate = await supabase.from('Report').update({report_url: `${fileSupabaseURL.data.publicUrl}`}).eq("id", res.data.id)
            if (!resUpdate){
                return {status: true, code: 202, message: "Report has been added successfully but failed to save Report"}
            }
        }
        return { status:true, code: res.status, message: "Report has been completed!" };
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

async function UploadReportSupabase(File: File, path: string){
    try {
        const res = await supabase
        .storage
        .from('report')
        .upload(path, File, {
            cacheControl: '0',
            upsert: true
        })
        return res;
    } catch (error) {
        return null;
    }
}

export async function OrderValidation(order: OrderMutation) : Promise<Response>{
    try {
        for (let index = 0; index < order.OrderDetail.length; index++) {
            console.log(order.OrderDetail[index])
            const { data, error } = await supabase.from('Product').select('quantity').eq('id', order.OrderDetail[index].product.id).single();

            if (error) {
                return {status: false, code: 400, message:"Failed to get Product stock"}
            }
                
            const stock = data?.quantity?? 0;

            if (stock < order.OrderDetail[index].quantity) {
                return {status: false, code: 400, message:"Product stock is less than Order quantity"}
            }
            // console.log(order.OrderDetail[index].product.product_name + " validation complete")
        }

        return {status: true, code: 200, message:"Validation complete!"}
    }
    catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function getProfit(){
    try { 
        let { data, error } = await supabase.rpc('get_profit', {
            businessprofileid: await getUserBusinessProfileId()
        })
        if (error) console.error(error)
         return data
    }catch(error){
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }

}

export async function getOrder(){
    try {
        let { data, error } = await supabase.rpc('get_order_count', {
            businessprofileid: await getUserBusinessProfileId()
        })
        if(error) console.error(error)
        return data
        }catch(error){
            return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
        }
}

export async function getOrderCompleted(){
    try{
        let { data, error } = await supabase.rpc('get_order_count_completed', {
            businessprofileid: await getUserBusinessProfileId()
          })
        if (error) console.error(error)
        return data
        }catch(error){
            return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
        }
}

export async function getTopSelling(){
    try{
        let { data, error } = await supabase.rpc('topselling', {
            businessprofileid: await getUserBusinessProfileId()
        })
        if (error) console.error(error)
        return data
    }catch(error){
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" };
    }
}

export async function BarOrderCount() {
    const { data, error } = await supabase.rpc("get_order_count_yearly", {
      businessprofileid: await getUserBusinessProfileId(),
    })
  
    if (error || !data) {
      console.error("Error:", error)
      return [] // Ensure that you return an empty array in case of error
    }
    return data
  }

export async function BarOrderCompleted(){
    const { data, error } = await supabase.rpc("get_order_count_completed_yearly", {
        businessprofileid: await getUserBusinessProfileId(),
      })
    
      if (error || !data) {
        console.error("Error:", error)
        return [] // Ensure that you return an empty array in case of error
      }

      return data
}

export async function BarProfit(){
    const { data, error } = await supabase.rpc("get_profit_yearly", {
        businessprofileid: await getUserBusinessProfileId(),
      })
    
      if (error || !data) {
        console.error("Error:", error)
        return [] // Ensure that you return an empty array in case of error
      }
      return data
}

export async function getReportMonthly() : Promise<ReportsResponse>{
    try {
        const reports = await supabase.from('Report').select('*').eq('business_profile_id', await getUserBusinessProfileId()).eq('is_monthly', true).order('created_at', {ascending: false})
        if(!reports.data){
            return {status:false, code:200, message: reports.statusText, data: reports.data};
        }
        return {status:true, code:200, message: reports.statusText, data: reports.data};
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}

export async function getReportYearly() : Promise<ReportsResponse>{
    try {
        const reports = await supabase.from('Report').select('*').eq('business_profile_id', await getUserBusinessProfileId()).eq('is_yearly', true).order('created_at', {ascending: false})
        if(!reports.data){
            return {status:false, code:200, message: reports.statusText, data: reports.data};
        }
        return {status:true, code:200, message: reports.statusText, data: reports.data};
        
    } catch (error) {
        return { 
            status:false, code: 500, message: String(error)??"Unexpected error occurred", 
            data:null
        };
    }
}