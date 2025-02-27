'use client'

import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"

/**
 * A container to create a modal that opens on-click
 *
 * @component
 * @example
 * // Usage example:
 * <PopupContainer trigger={<Button>Trigger</Button>} modalTitle="Modal Title" modalDescription="Modal Description"><Form/></PopupContainer>
 *
 * @param {Object} props - Props object for the component.
 * @param {ReactElement} props.trigger - a React component that will open the dialog, it must contain on optional onClick function prop
 * @param {string} props.modalTitle - title of the modal
 * @param {string} props.modalDescription - description displayed under the title
 * @param {ReactElement} props.children - content of the modal, it must contain an optional closeDialog function prop
 * @returns {JSX.Element} The rendered PopupContainer component.
 */

export default function PopupContainer(
    { trigger, modalTitle, modalDescription, children }: 
    { trigger: ReactElement<{ onClick:()=>void }>, modalTitle: string, modalDescription: string, children: ReactElement<{ closeDialog:()=>void }> }
){
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const openDialog = useCallback(()=>setIsOpen(true), [setIsOpen]);
    const closeDialog = useCallback(()=>setIsOpen(false), [setIsOpen]);
    const [ isDesktop, setIsDesktop ] = useState<boolean>(true);

    useEffect(()=>setIsDesktop(window.innerWidth>=768), []);

    const modifiedTrigger = React.Children.map(trigger, (child, key)=> {
        if(React.isValidElement(child)){
            return React.cloneElement(child, { key, onClick: openDialog })
        }
    });

    const modifiedChildren = React.Children.map(children, (child, key)=> {
        if(React.isValidElement(child)){
            return React.cloneElement(child, { key, closeDialog })
        }
        return child;
    });

    return isDesktop ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {modifiedTrigger}
            <DialogContent className="min-w-[30vw] max-w-[80vw] max-h-[90vh] w-auto p-8 bg-white rounded-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogDescription>{modalDescription}</DialogDescription>
                </DialogHeader>
                {modifiedChildren}
            </DialogContent>
        </Dialog>
    ):(
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            {modifiedTrigger}
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{modalTitle}</DrawerTitle>
                    <DrawerDescription>{modalDescription}</DrawerDescription>
                </DrawerHeader>
                <div className="py-2 px-5">{modifiedChildren}</div>
            </DrawerContent>
        </Drawer>
    )
}