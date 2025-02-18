// imports
import { onCleanup, onMount, Accessor } from "solid-js";

/**
 * Hook to detect clicks outside of a given element and trigger a callback.
 *
 * @param {()=>void} callback - Function to be called when a click is detected outside.
 * @param {string} parentID - ID of the parent element to check against.
 * @param {Accessor<HTMLElement | null>} getRef - Accessor function returning the popover element.
 */
const useOnClickOutside = (callback: () => void, parentID: string, getRef: Accessor<HTMLElement | null>) => {
    const onClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const popoverElement = getRef();

        if (target?.id !== parentID && popoverElement && !popoverElement.contains(target)) {
            callback();
        }
    };

    onMount(() => {
        setTimeout(() => document.addEventListener("click", onClick));
    });

    onCleanup(() => {
        setTimeout(() => document.removeEventListener("click", onClick));
    });
};

export { useOnClickOutside };
