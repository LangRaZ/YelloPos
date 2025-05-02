import { Metadata } from "next"
import TaxProfile from "./ui/taxprofile"
export const metadata: Metadata = {
  title: "Tax"
}

export default function TaxPage() {
  
  return (
    <TaxProfile />

  )
}
