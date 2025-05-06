import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { SquarePlus } from "lucide-react"
import CategoryForm from "./form"

export function CreateCategoryButton(){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}><SquarePlus />Add Category</Button>}
            modalTitle="Add new Category"
            modalDescription="Fill all the required data fields"
        >
            {/* Insert form component to be put inside popup page */}
            <CategoryForm/>
        </PopupContainer>
    )
}
