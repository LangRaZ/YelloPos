import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import UserForm from "./form"
import { Role } from "@/interface"


export function CreateUserButton({ RolesData } : { RolesData:Role[]|null }){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}>Add User</Button>}
            modalTitle="Add new User"
            modalDescription="Fill all the required data fields"
        >
            {/* Insert form component to be put inside popup page */}
            <UserForm roles={RolesData}/>
        </PopupContainer>
    )
}
