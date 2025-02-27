import PopupContainer from "@/components/helpers/popup-container"
import { Button } from "@/components/ui/button"
import ProductForm from "./form"
import { Category } from "@/interface"


export function CreateProductButton({ categoriesData } : { categoriesData: Category[]|null }){
    return(
        <PopupContainer
            trigger={<Button variant={"outline"}>Add Product</Button>}
            modalTitle="Add new product"
            modalDescription="Fill all the required data fields"
        >
            <ProductForm categories={categoriesData}/>
        </PopupContainer>
    )
}
