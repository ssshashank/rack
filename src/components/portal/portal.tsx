// imports
import { Component, JSX, splitProps } from "solid-js";
import { Portal } from "solid-js/web";

// PORTAL Props
interface PortalProps {
    children?: JSX.Element;
    class?: string;
}

// PORTAL Component
const SolidPortal: Component<PortalProps> = (props) => {
    // Separate our special props from the rest
    const [local, others] = splitProps(props, ["class", "children",]);

    return (
        <Portal mount={globalThis?.document?.body ?? null} {...others}>
            {local.children}
        </Portal>
    );
};

export { SolidPortal };
