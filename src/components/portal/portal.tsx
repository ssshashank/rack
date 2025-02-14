
import { Component, JSX, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { cn } from "@/utils";

// Portal props
interface PortalWrapperProps {
    asChild?: keyof JSX.IntrinsicElements | Component<any>;
    mount?: HTMLElement | null;
    children?: JSX.Element;
    ref?: (el: HTMLElement) => void;
    class?: string;
}

// Portal Component
const Portal: Component<PortalWrapperProps> = (props) => {
    // Separate our special props from the rest
    const [local, others] = splitProps(props, ["asChild", "ref", "children", "class", "mount"]);

    return (
        <Dynamic
            component={local.asChild || "div"}
            ref={local.ref}
            class={cn("absolute z-50", local.class)}
            {...others}
        >
            {local.mount
                ? <div ref={local.ref} class={local.class} {...others}>{local.children}</div>
                : local.children}
        </Dynamic>
    );
};

// export
export { Portal };

