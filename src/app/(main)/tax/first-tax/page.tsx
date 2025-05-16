import { Metadata } from "next";
import TaxFirstLoginForm from "./ui/first_login_tax";

export const metadata: Metadata = {
    title: "First Tax Setup"
};

export default async function FirstTaxPage(){

    return(
        <main>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 shadow-md rounded-md w-full max-w-lg space-y-4">
                    <h2 className="text-xl font-bold">Submit Tax Info</h2>
                    <TaxFirstLoginForm/>
                </div>
            </div>
        </main>
    )
}