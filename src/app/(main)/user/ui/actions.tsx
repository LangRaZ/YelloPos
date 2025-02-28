import PopupContainer from "@/components/helpers/popup-container"
import { Button } from "@/components/ui/button"
import ProductForm from "./form"
import { Category } from "@/interface"


export function CreateUserButton({ RolesData } : { RolesData: Category[]|null }){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"outline"}>Add User</Button>}
            modalTitle="Add new product"
            modalDescription="Fill all the required data fields"
        >
            {/* Insert form component to be put inside popup page */}
            <ProductForm roles={RolesData}/>
        </PopupContainer>
    )
}
