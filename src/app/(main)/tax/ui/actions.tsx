import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { SquarePlus } from "lucide-react"
import ReportForm from "./form"

export function CreateReportButton({ type }: { type: string}){
    console.log(type)
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}><SquarePlus />Create Report</Button>}
            modalTitle="Create a new Report"
            modalDescription=""
        >
            {/* Insert form component to be put inside popup page */}
            <ReportForm></ReportForm>
        </PopupContainer>
    )
}
