import { Metadata } from "next";
import FirstLoginForm from "./ui/first_login_form"

export const metadata: Metadata = {
    title: "First Account Setup"
};

export default function FirstLoginPage(){
    return(
        <main>
            <FirstLoginForm />
        </main>
    )
}