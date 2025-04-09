"use server"

import { createClient } from "./server_config"
import { Response } from "@/interface"

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
        const temp = await (await supabaseServer.auth.getUser()).data.user?.user_metadata.business_profile_id
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