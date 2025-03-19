export interface Response {
    /** Is the request successful? */
    status: boolean,
    /** HTTP status code */
    code:number,
    /** Response message */
    message:string
}

// Interfaces for Product
export interface ProductMutation{
    product_name: string | null
    product_category_id : number | null
    product_image : string | null
    description : string | null
    sell_price : number | null
    quantity : number | null
    is_active: boolean | null
}

export interface ProductMutationImage{
    product : ProductMutation 
    product_image : File | null
}

export interface Product extends ProductMutation{
    id: number
    Category: CategoryDetail | null
    business_profile_id?: number | null
    need_quantity?: boolean | null
}

export interface ProductResponse extends Response{
    data: Product | null
}

export interface ProductsResponse extends Response{
    data: Product[] | null
}




//Interfaces for User
export interface UserMutation{
    // access_code: string | null
    // business_profile_id: number | null    
    email: string | null
    name: string | null
    role_id: number | null
    // username: string | null
    phone_number : string | null
}


export interface User extends UserMutation{
    id : string
}
export interface UserResponse extends Response{
    data: User | null
}

//Interfaces for Category
export interface CategoryMutation{
    business_profile_id: number | null,
    category_name: string | null,
    description: string | null,
}

export interface CategoryDetail{
    category_name: string | null
}

export interface Category extends CategoryMutation{
    id: number,
}

export interface CategoryResponse extends Response{
    data: Category | null
}

//interface for transaction
export interface TransactionMutation{
    business_profile_id: number | null
    created_at: string
    total_payment: number | null
    transaction_status: string | null
    transaction_id: string 
}
export interface TransactionDetail{
    category_name: string | null
}

export interface Transaction extends TransactionMutation{
    id: number,
}

export interface TransactionsResponse extends Response{
    data: Transaction[] | null
}

//interface for roles
export interface Role{
    role_name: string | null,
    id: number,
}

//Interface for Auths
export interface AuthOpt{
    data: AuthOptData
}

export interface AuthOptData{
    name: string
    phone_number: string
    first_login:boolean
}

export interface Auth {
    email: string
    password: string
}


export interface AuthRegister extends Auth{
    options?: AuthOpt
}

export interface AuthMutation{
    name: string
    email: string
    phone_number: string
    password: string
    confirm_password: string
}
export interface BusinessMutation{
    address: string
    bank_account_name: string | null
    bank_account_number: string | null
    business_name: string
    code: string
    created_at: string
    email: string
    id: number
    phone_number: string
}

//Order detail
export interface OrderDetailTemporary{
    product: Product
    quantity: number
    total_price: number
}



