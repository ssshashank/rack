// imports
import { createSignal, createEffect, onCleanup, Accessor } from "solid-js";
import { Placement } from "@Configs/constants/app";

/**
 * Hook to calculate and return the coordinates for the popover
 * based on its parent element's position and the specified placement.
 * It adjusts the popover's placement based on the viewport to ensure visibility.
 *
 * @param {string} parentID - The ID of the parent element to which the popover is attached.
 * @param {Accessor<HTMLElement | null>} getChild - Accessor function returning the popover element.
 * @param {Placement} initialPlacement - The initial desired placement of the popover.
 * @return {object} The calculated top and left positions for the popover.
 */

const usePopoverCoordinates = (
    parentID: string,
    getChild: Accessor<HTMLElement | null>,
    initialPlacement: Placement = Placement.BOTTOM
) => {
    const [coordinates, setCoordinates] = createSignal({ top: 0, left: 0, right: 0 });

    const updateCoordinates = () => {
        const parentElement = document.getElementById(parentID);
        const childElement = getChild();

        if (!parentElement || !childElement) return;

        const rect = parentElement.getBoundingClientRect();
        const childRect = childElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let top = rect.top,
            left = rect.left,
            right = rect.right;

        // Adjust position based on placement
        switch (initialPlacement) {
            case Placement.TOP:
                top = rect.top - childRect.height - 30;
                left = rect.left;
                break;
            case Placement.BOTTOM:
                top = rect.bottom + 10;
                left =
                    childRect.width > viewportWidth - rect.left
                        ? rect.left - childRect.width + 50
                        : rect.left;
                break;
            case Placement.BOTTOMLEFT:
                top = rect.bottom + 10;
                left = rect.left - childRect.width + 50;
                break;
        }
        setCoordinates({ top, left, right });
    };

    createEffect(() => {
        updateCoordinates(); // initial positioning
        window.addEventListener("resize", updateCoordinates);
        window.addEventListener("scroll", updateCoordinates, true);

        onCleanup(() => {
            window.removeEventListener("resize", updateCoordinates);
            window.removeEventListener("scroll", updateCoordinates, true);
        });
    });

    return coordinates;
};

export { usePopoverCoordinates };
