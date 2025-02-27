import { z } from "zod"

export const LoginValidation = z.object({
    username: z.string().min(5, {
        message: "Username must be at least 5 characters",
    }).max(100),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters"
    }).max(100)
})