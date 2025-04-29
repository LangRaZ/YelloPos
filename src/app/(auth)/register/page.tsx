import { Metadata } from "next";
import RegisterForm from "./ui/register_form"

export const metadata: Metadata = {
    title: "Register"
};

export default function RegisterPage(){
    return(
        <main>
            <RegisterForm />
        </main>
    )
}