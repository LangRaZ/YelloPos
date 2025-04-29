import { Metadata } from "next";
import LoginForm from "./ui/login_form"

export const metadata: Metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <main>
        <LoginForm />
    </main>
  )
}
