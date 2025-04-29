import { Metadata } from "next";
import TaxFirstLoginForm from "./ui/first_login_tax";

export const metadata: Metadata = {
    title: "First Tax Setup"
};

export default async function FirstTaxPage(){

    return(
        <main>
            <TaxFirstLoginForm/>
        </main>
    )
}