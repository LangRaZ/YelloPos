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
    name: z.string().nonempty("Product name must not be empty"),
    category_id: z.string().nonempty("Category must not be empty"),
    description: z.string().optional(),
    price: z.number().min(1, {
        message: "Product price must be greater than 0"
    }),
    quantity: z.number().min(1, {
        message: "Product price must be greater than 0"
    })
})