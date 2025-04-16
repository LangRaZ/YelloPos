import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { SquarePlus } from "lucide-react"
import ReportFormYearly from "./formYearly"

export function CreateReportYearlyButton({ type }: { type: string}){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}><SquarePlus />Create Report</Button>}
            modalTitle= "Create a new Yearly Report"
            modalDescription=""
        >
            {/* Insert form component to be put inside popup page */}
            <ReportFormYearly></ReportFormYearly>
        </PopupContainer>
    )
}
