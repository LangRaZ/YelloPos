"use server"

import { createClient } from "./server_config"
import { Response, User, UserResponse } from "@/interface"

export async function updateAuthUser(firstLoginState: boolean, businessProfileId: number) : Promise<Response>{
    const supabaseServer = await createClient()
    try {
        const {data, error} = await supabaseServer.auth.updateUser({
            data:{
                first_login: firstLoginState,
                business_profile_id: businessProfileId
            }
        })
        if(!error){
            await supabaseServer.from('Accounts').update({business_profile_id: businessProfileId}).eq('id', data.user.id)
            return { status: true, code: 200, message:"Account updated successfully" }
        }
        return { status: false, code: 500, message: error.message }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

export async function getUserBusinessProfileId(){
    const supabaseServer = await createClient()
    try {
        const temp = (await supabaseServer.auth.getUser()).data.user?.user_metadata.business_profile_id
        // console.log(temp)
        if(temp){
            return temp
        }
        else {
            return { status: false, code: 500, message:"Business Profile Id not get" }
        }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

//Tax First Login
export async function updateAuthTax(firstTaxState: boolean) : Promise<Response>{
    const supabaseServer = await createClient()
    try {
        const {error} = await supabaseServer.auth.updateUser({
            data:{
                first_setup_tax: firstTaxState,
                
            }
        })
        if(!error){
            return { status: true, code: 200, message:"Tax updated successfully" }
        }
        return { status: false, code: 500, message: error.message }
    } catch (error) {
        return { status:false, code: 500, message: String(error)??"Unexpected error occured" }
    }
}

export async function getUserUID() : Promise<string>{
    const supabaseServer = await createClient()
    try {
        const temp = await supabaseServer.auth.getUser()
        // console.log(temp)
        if(temp.data.user){
            return temp.data.user.id
        }
        else {
            return ""
        }
    } catch (error) {
        console.log(String(error)??"Error getting user ID")
        return ""
    }
}

export async function getCurrentUser() : Promise<UserResponse>{
    const supabaseServer = await createClient()
    try {
        const temp = await supabaseServer.auth.getUser()
        // console.log(temp)
        if(!temp.data.user){
            return {status: false, code: 500, message:"Failed to get user", data: null}
        }
        const user: User = {
            id: temp.data.user.id,
            email: temp.data.user.user_metadata.email,
            name: temp.data.user.user_metadata.name,
            business_profile_id: temp.data.user.user_metadata.business_profile_id,
            phone_number: temp.data.user.user_metadata.phone_number,
            username: temp.data.user.user_metadata.name,
            role_id: temp.data.user.user_metadata.role_id??1
        }
        return {status: true, code: 200, message:"Get user success", data: user}
        
    } catch (error) {
        return {status: false, code: 500, message:String(error)??"Error getting user ", data: null}
    }
}