import { z } from "zod"

export const LoginValidation = z.object({
    email: z.string().min(5, {
        message: "Email must be at least 5 characters",
    }).max(100),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters"
    }).max(100)
})

export const ProductValidation = z.object({
    product_name: z.string().nonempty("Product name must not be empty"),
    product_category_id: z.number({
        required_error: "Category must not be empty",
    }).positive("Category must not be empty"),
    description: z.string(),
    sell_price: z.number({
        required_error: "Product price must no be empty",
    }).int(),
    quantity: z.number({
        required_error: "Product quantity must not be empty",
    }).int(),
    is_active: z.boolean()
})

export const UserValidation = z.object({
    name: z.string().nonempty("Name must not be empty"),
    email: z.string().nonempty("Email must not be empty"),
    role_id: z.number({
        required_error: "Role must not be empty",
    }).positive("Role must not be empty"),
    phone_number:z.string().nonempty("Phone number must not be empty")
})

export const CategoryValidation = z.object({
    business_profile_id: z.number(),
    category_name: z.string().nonempty("Product name must not be empty"),
    
    description: z.string(),
    
    is_active: z.boolean()
})