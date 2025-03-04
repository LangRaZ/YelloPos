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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Response } from "@/interface";

/**
 * DeleteAlert - A component that asks for confirmation before executing a
 * function, display a success message afterwards
 *
 * @component
 * @example
 * // Usage example:
 * <ProceedAlert id="adaergr" action={executeAction} warningMessage="warning" successMessage="success" successDescription="Successss" />
 *
 * @param {Object} props - Props object for the component.
 * @param {string} props.id - object id
 * @param {Function} props.action - function to execute on click
 * @param {string} props.warningMessage - confirmation message
 * @param {string} props.successMessage - message to display on success
 * @param {string} props.successDescription - message detail to display on success
 *
 * @returns {JSX.Element} The rendered ProceedAlert component.
 */
export default function DeleteAlert ({
  id,
  action,
  warningMessage,
  successMessage,
  successDescription,
  label="Delete"
}: {
  id: string;
  action: (_id: string) => Promise<Response>;
  warningMessage: string;
  successMessage: string;
  successDescription: string;
  label?:string
}) {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="h-8 rounded-md px-3 bg-destructive text-destructive-foreground hover:bg-destructive/90">
        <Trash className="w-4 h-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{warningMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              action(id)
                .then((res: Response) => {
                  if (res.status) {
                    toast.success(successMessage,{ description: successDescription });
                    router.refresh();
                  } else {
                    toast.warning(res.message);
                  }
                })
                .catch((error) => {
                  toast.error(error.message ?? "Unexpected error occurred!",{ description: "Please reload the page!"});
                });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

