//  imports
import { ButtonElement } from "@/config/primitive";
import { Accessor, createContext, useContext } from "solid-js";

//  Dropdown Context Props
interface DropdownContextValue {
    open: Accessor<boolean>;
    toggle: (e: MouseEvent) => void;
    close: () => void;
    setTriggerRef: (el: ButtonElement) => void;
    setContentRef: (el: HTMLDivElement) => void;
    triggerEl: () => HTMLElement | null;
    contentEl: () => HTMLDivElement | null;
}

//  Dropdown Context
export const DropdownContext = createContext<DropdownContextValue>();

/*  Dropdown Context Hooks
 *  This hooks creates a context to share the dropdown state and actions.
*/
export const useDropdownContext = () => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error("Dropdown must be inside DropdownRoot");

    return context;
};

//  export
export type {
    DropdownContextValue
};
