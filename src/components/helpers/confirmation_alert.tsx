"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Response } from "@/interface";
import { useState } from "react";
import { ButtonLoading } from "./button_loading";

/**
 * ConfirmationAlert - A component that asks for confirmation before executing a
 * function, display a success message afterwards
 *
 * @component
 * @example
 * // Usage example:
 * <ConfirmationAlert id="adaergr" action={executeAction} warningMessage="warning" successMessage="success" successDescription="Successss" label={"Delete" | "Confirm"}/>
 *
 * @param {Object} props - Props object for the component.
 * @param {string} props.id - object id
 * @param {Function} props.EditAction - function to execute on click for objects with _id params
 * @param {Function} props.DefaultAction - function to execute on click default function
 * @param {string} props.warningMessage - confirmation message
 * @param {string} props.successMessage - message to display on success
 * @param {string} props.successDescription - message detail to display on success
 * @param {string} props.variant - variants of confirmation popup
 *
 * @returns {JSX.Element} The rendered ConfirmationAlert component.
 */
export default function ConfirmationAlert ({
  id,
  EditAction,
  DefaultAction,
  warningMessage,
  successMessage,
  successDescription,
  variant
}: {
  id?: string;
  EditAction?: (_id: string) => Promise<Response>;
  DefaultAction?: ()=> void;
  warningMessage: string;
  successMessage: string;
  successDescription: string;
  variant: "Delete" | "Confirm"
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  return (
    <AlertDialog>
      {variant === "Delete" && (
      <AlertDialogTrigger className="h-8 rounded-md px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90">
        <Trash className="w-4 h-4" />
      </AlertDialogTrigger>
      )}
      {variant === "Confirm" && (
      <AlertDialogTrigger className="w-full bg-primary hover:bg-primary/90 rounded-md h-9 text-primary-foreground px-2 py-4 text-sm font-medium inline-flex justify-center items-center" role="button">
        <p>Confirm Order</p>
      </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{warningMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {isLoading ? (
            <ButtonLoading />
          ):(
            <AlertDialogAction
              onClick={() => {
                if(EditAction && id){
                  setIsLoading(true)
                  EditAction(id)
                    .then((res: Response) => {
                      if (res.status) {
                        toast.success(successMessage,{ description: successDescription });
                        router.refresh();
                        setIsLoading(false)
                      } else {
                        toast.warning(res.message);
                        setIsLoading(false)
                      }
                    })
                    .catch((error) => {
                      toast.error(error.message ?? "Unexpected error occurred!",{ description: "Please reload the page!"});
                      setIsLoading(false)
                    });
                }
                if(DefaultAction){
                  setIsLoading(true)
                  DefaultAction();
                  setIsLoading(false)
                }
              }}
            >
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

