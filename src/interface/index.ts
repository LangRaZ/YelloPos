

export interface ProductMutation{
    name: string,
    categoryid: number,
    category: string | null,
    description: string,
    price: number,
    quantity: number,
}

export interface CategoryMutation{
    business_profile_id: number | null,
    category_name: string | null,
}

export interface Category extends CategoryMutation{
    id: number,
}
