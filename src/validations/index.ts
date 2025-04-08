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

const MAX_FILE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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
    product_image: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported."),
    is_active: z.boolean(),
    last_image_update: z.string(),
    business_profile_id: z.number()
})

export const UserValidation = z.object({
    name: z.string().nonempty("Name must not be empty"),
    email: z.string().nonempty("Email must not be empty").email("Invalid email address"),
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

export const BusinessProfileValidation = z.object({
    business_profile_id: z.number(),
    business_name: z.string().nonempty("Business name must not be empty"),
    address:  z.string().nonempty("Business address must not be empty"),
    email: z.string(),
    bank_account_name: z.string().nonempty("Bank account name must not be empty"),
    bank_account_number: z.string().nonempty("Bank account number must not be empty"),
    code: z.string(),
    created_at: z.string(),
    phone_number: z.string().nonempty("Phone number must not be empty").min(10, {
        message: "Invalid phone number"
    }).max(14, {
        message: "Invalid phone number"
    }),
    profile_image_url: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported."),
    qr_image_url: z
    .instanceof(File)
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported."),
    last_profile_update : z.string(),
    last_qr_update: z.string(),
    is_active: z.boolean()
})

export const BusinessValidation = z.object({
    address: z.string().nonempty("Address must not be empty"),    
    business_name: z.string().nonempty("Address must not be empty"),
    bank_account_name: z.string().nonempty("Bank account must not be empty"),
    bank_account_number: z.string().nonempty("Bank account must not be empty"),
    code: z.string(),
    created_at: z.string(),
    email: z.string(),
    id: z.number(),
    phone_number: z.string().nonempty("Phone number must not be empty").min(10, {
        message: "Invalid phone number"
    }).max(14, {
        message: "Invalid phone number"
    }),
    
})