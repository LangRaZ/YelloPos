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
        required_error: "Category must not be empty",
    }).nonnegative(),
    phone_number:z.string().nonempty("Phone number must not be empty")
})