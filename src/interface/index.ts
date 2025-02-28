

export interface ProductMutation{
    product_name: string | null
    product_category_id : number | null
    description : string | null
    sell_price : number | null
    quantity : number | null
    is_active: boolean | null
}

export interface UserMutation{
    // access_code: string | null
    // business_profile_id: number | null    
    email: string | null
    name: string | null
    role_id: number | null
    username: string | null
}

export interface Product extends ProductMutation{
    id: number
    business_profile_id?: number | null
    need_quantity?: boolean | null
}

export interface User extends UserMutation{
    id : string
}

export interface CategoryMutation{
    business_profile_id: number | null,
    category_name: string | null,
}

export interface Category extends CategoryMutation{
    id: number,
}
