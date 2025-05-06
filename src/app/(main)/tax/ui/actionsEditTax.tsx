import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"

import { Tax } from "@/interface"
import TaxFirstLoginForm from "../first-tax/ui/first_login_tax"


export function ChangeTaxButton({ TaxProfile } : { TaxProfile: Tax|null }){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}><Pencil  />Edit Tax</Button>}
            modalTitle="Edit Tax"
            modalDescription="Fill all the required data fields"
        >
            {/* Insert form component to be put inside popup page */}
            <TaxFirstLoginForm id={TaxProfile?.id} data={TaxProfile??null}/>
        </PopupContainer>
    )
}
