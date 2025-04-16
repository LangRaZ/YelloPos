import PopupContainer from "@/components/helpers/popup_container"
import { Button } from "@/components/ui/button"
import { SquarePlus } from "lucide-react"
import ReportForm from "./formYearly"
import ReportFormMonthly from "./formMonthly"

export function CreateReportMonthlyButton({ type }: { type: string}){
    return(
        //Use popup container for popup create update form
        //Add trigger : trigger button, modalTitle: form title, modalDescription: form description
        <PopupContainer
            trigger={<Button variant={"default"}><SquarePlus />Create Report</Button>}
            modalTitle= "Create a new Monthly Report"
            modalDescription=""
        >
            {/* Insert form component to be put inside popup page */}
            <ReportFormMonthly></ReportFormMonthly>
        </PopupContainer>
    )
}
