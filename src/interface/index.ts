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
    last_image_update: string
    business_profile_id?: number | null
}

export interface ProductMutationImage{
    product_name: string | null
    product_category_id : number | null
    product_image : File
    description : string | null
    sell_price : number | null
    quantity : number | null
    is_active: boolean | null
    last_image_update: string
    business_profile_id?: number | null
}

export interface Product extends ProductMutation{
    id: number
    Category: CategoryDetail | null
    need_quantity?: boolean | null
}

export interface ProductDetail{
    product_name: string | null
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
    business_profile_id: number | null    
    email: string
    name: string
    role_id: number | null
    username: string
    phone_number : string
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
    transaction_status: string
}
export interface TransactionDetail{
    category_name: string | null
}

export interface TransactionAccountDetail{
    name: string
}

export interface Transaction extends TransactionMutation{
    id: number,
    completed_time: string | null
    processed_by_account_id: string | null
    processed_time: string | null
    payment_method: string
    Account?: TransactionAccountDetail | null
}

export interface TransactionsResponse extends Response{
    data: Transaction[] | null
}

export interface TransactionResponse extends Response{
    data: Transaction | null
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
    username: string | null
    first_login:boolean
    first_setup_tax:boolean
    business_profile_id:number|null
    role_id:number|null
}

export interface Auth {
    email: string
    password: string
}


export interface AuthRegister extends Auth{
    options?: AuthOpt
}

export interface AuthNewUser extends Auth{
    user_metadata?: AuthOptData
    email_confirm: boolean
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
    bank_account_name: string
    bank_account_number: string
    business_name: string
    code: string
    email: string
    phone_number: string
    profile_image_url : string
    qr_image_url : string
    last_profile_update : string
    last_qr_update : string
}

//interface for order
export interface OrderDetailTemporary{
    product: Product
    quantity: number
    total_price: number
}

export interface OrderDetailMutation{
    product_id: number
    order_id: number
    quantity: number
    total_price: number
}

export interface OrderMutation{
    OrderDetail: OrderDetailTemporary[]
    total_price: number
    business_profile_id: number
}

export interface OrderDetail extends OrderDetailMutation{
    id: number
    product_detail: ProductDetail
}

export interface OrderDetailsResponse extends Response{
    data: OrderDetail[] | null
}

//Business Profile
export interface BusinessProfileMutation{
    id: number ,
    address: string
    bank_account_name: string
    bank_account_number: string
    business_name: string
    code: string
    email: string
    phone_number: string
    profile_image_url : string
    qr_image_url : string
    last_profile_update : string
    last_qr_update : string
}

export interface BusinessProfileImage{
    id: number ,
    address: string
    bank_account_name: string
    bank_account_number: string
    business_name: string
    code: string
    email: string
    phone_number: string
    profile_image_url : File
    qr_image_url : File
    last_profile_update : string
    last_qr_update : string
}





export interface BusinessProfileResponse extends Response{
    data: BusinessProfileMutation | null    
}

//Tax

export interface TaxMutation{
    business_profile_id: number | null
    is_pph: boolean | null
    is_ppn: boolean | null
    monthly_bruto: number | null
    pph_percentage: number | null
    pph_type: string | null
    ppn_percentage: number | null
    yearly_bruto: number | null
}

export interface TaxProfileResponse extends Response{
    data: TaxMutation | null
}

export interface SidebarParam {
    role_name:string
    name:string
}

export interface ReportMutation {
    report_url: string | null
    business_profile_id: number | null
    is_monthly: boolean | null
    is_yearly: boolean | null
    month: number | null
    year: number | null
    report_name: string | null
}

export interface Reports extends ReportMutation {
    created_at: string
}

export interface ReportsResponse extends Response{
    data: ReportMutation[] | null
}

export interface TaxReportMutation {
    month: string | null
    sum: number | null
    pph: number | null
}

export interface TaxReportsResponse extends Response{
    data: TaxReportMutation[] | null
}

export interface MonthlyTaxReportMutation {
    day: number | null
    grossprofit: number | null
}

export interface MonthlyTaxReportsResponse extends Response{
    data: MonthlyTaxReportMutation[] | null
}