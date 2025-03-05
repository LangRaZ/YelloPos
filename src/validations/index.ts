import { z } from "zod"

export const LoginValidation = z.object({
    email: z.string().nonempty("Email must no be empty").email("Invalid email address"),
    password: z.string().nonempty("Password must not be empty")
})

export const RegisterValidation = z.object({
    name: z.string().nonempty("Owner name must not be empty"),
    email: z.string().nonempty("Email must no be empty").email("Invalid email address"),
    phone_number: z.string().nonempty("Phone number must not be empty").min(10, {
        message: "Invalid phone number"
    }).max(14, {
        message: "Invalid phone number"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }).regex(RegExp("([0-9]+[A-Za-z]|[A-Za-z]+[0-9])[a-z0-9]*"), "Password must contain at least a number and an alphabet (Alphanumeric)"),
    confirm_password: z.string(),
}).refine((data)=> data.password === "" || data.password === null ? true : data.password === data.confirm_password,{
    message: "Passwords don't match",
    path: ["confirm_password"]
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