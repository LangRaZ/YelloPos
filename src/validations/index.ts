import { z } from "zod"

export const LoginValidation = z.object({
    username: z.string().min(5, {
        message: "Username must be at least 5 characters",
    }).max(100),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters"
    }).max(100)
})

export const ProductValidation = z.object({
    product_name: z.string().nonempty("Product name must not be empty"),
    product_category_id: z.string().nonempty("Category must not be empty"),
    description: z.string().optional(),
    sell_price: z.number().min(1, {
        message: "Product price must be greater than 0"
    }),
    quantity: z.number().min(1, {
        message: "Product price must be greater than 0"
    }),
    is_active: z.boolean()
})

export const UserValidation = z.object({
    name: z.string().nonempty("Name must not be empty"),
    email: z.string().nonempty("Email must not be empty"),
    
})