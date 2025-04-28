import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react"
import OrderDetailForm from "./form"
import { OrderDetail } from "@/interface"

export function EditOrderDetailButton({ data } : { data: OrderDetail }){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"outline"} className="h-8 rounded-md px-3"><Pencil className="w-4 h-4"/></Button>}
            modalTitle="Edit Item Quantity"
            modalDescription="Fill the required data field"
            >
            <OrderDetailForm id={data.id} data={data}/>
        </PopupContainer>
    )
}