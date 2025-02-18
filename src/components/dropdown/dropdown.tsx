// imports
import { Component, createEffect, createMemo, createSignal, JSX, onCleanup, onMount, Show, splitProps } from "solid-js";
import { Dynamic, Portal } from "solid-js/web";
import { DropdownContext, useDropdownContext } from "./dropdown.context";
import { ButtonElement, PrimitveButtonProps } from "@Configs/primitive";

//  Dropdown Trigger Props
interface DropdownWrapperProps extends PrimitveButtonProps {
    asChild?: keyof JSX.IntrinsicElements | Component<any>;
    children?: JSX.Element;
    ref?: (el: ButtonElement) => void;
    class?: string;
    [key: string]: any;
}

//  Dropdown Trigger Component
const DropdownTrigger: Component<DropdownWrapperProps> = (props) => {
    // separate our special props from the rest
    const [local, others] = splitProps(props, ["asChild", "ref", "children", "class"])
    const { toggle, setTriggerRef } = useDropdownContext();

    // merge our ref with any passed-in ref
    const handleRef = (el: ButtonElement) => {
        setTriggerRef(el);
        if (local.ref) local.ref(el);
    };
    return (
        <Dynamic
            component={local?.asChild || 'button'}
            ref={handleRef}
            onClick={toggle}
            {...others}>
            {local?.children}
        </Dynamic>
    );
};

//  DropdownContent Props
interface DropdownContentProps {
    asChild?: any;
    ref?: (el: HTMLDivElement) => void;
    class?: string;
    children: any;
    [key: string]: any;
}

//  Dropdown Content Component
const DropdownContent: Component<DropdownContentProps> = (props) => {
    const [local, others] = splitProps(props, ["asChild", "ref", "children", "class"]);
    const { open, setContentRef, triggerEl, contentEl } = useDropdownContext();
    const [contentCoordinates, setContentCoordinates] = createSignal();
    
    const handleRef = (el: HTMLDivElement) => {
        setContentRef(el);
        if (local.ref) local.ref(el);
    };

    // compute the position of the trigger relative to the portal mount.
    const computedStyles = createMemo(() => {
        if (open() && triggerEl() && contentEl()) {
            let contentRect: any, left;
            const triggerRect = triggerEl()!.getBoundingClientRect();

            if (contentCoordinates()) {
                contentRect = contentCoordinates();
                left = (triggerRect.left + triggerRect?.width / 2) - contentRect?.width / 2
            };

            // calculate top as the trigger's bottom relative to the portal mount plus an offset.
            const top = triggerRect.bottom + window.scrollY + 4; // 4px offset below the trigger
            return { top: `${top}px`, left: `${left}px` };
        }
        return { top: "0px", left: "0px" };
    });

    // get the dropdown content coorinates when it appears on screen
    createEffect(() => {
        if (open() && contentEl()) {
            const rect = contentEl()!.getBoundingClientRect();
            if (rect) setContentCoordinates(rect);
        }
    });

    return (
        <Show when={open()}> <Portal mount={document?.body}>
            <Dynamic
                component={local.asChild || "div"}
                ref={handleRef}
                class={local.class}
                onClick={(e: MouseEvent) => e.stopPropagation()} // prevent clicks inside from closing
                style={{
                    position: "absolute",
                    ...computedStyles(),
                    background: "white",
                    border: "1px solid #ccc",
                    "box-shadow": "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "8px",
                    "z-index": "1000",
                }}
                {...others}
            >
                {local.children}
            </Dynamic>
        </Portal>
        </Show>
    );
};

//  Dropdown Item Props
interface DropdownItemProps {
    onSelect?: () => void;
    class?: string;
    children: any;
    [key: string]: any;
}

//  Dropdown Item Component
const DropdownItem: Component<DropdownItemProps> = (props) => {
    const [local, others] = splitProps(props, ["onSelect", "class", "children"]);
    const { close } = useDropdownContext();

    const handleClick = (e: MouseEvent) => {
        e.stopPropagation();
        if (local.onSelect) local.onSelect();
        console.log(e, '-items')
        close();
    };

    return (
        <div
            class={local.class}
            style={{ padding: "4px 8px", cursor: "pointer" }}
            onClick={handleClick}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            {...others}
        >
            {local.children}
        </div>
    );
};

//  Dropdown Root Component
const DropdownRoot: Component<{ children: JSX.Element }> = (props) => {
    const [open, setOpen] = createSignal(false);
    const [triggerEl, setTriggerEl] = createSignal<HTMLElement | null>(null);
    const [contentEl, setContentEl] = createSignal<HTMLDivElement | null>(null);

    const toggle = (e: MouseEvent) => {
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    const close = () => {
        setOpen(false);
    };

    const setTriggerRef = (el: HTMLElement) => {
        setTriggerEl(el);
    };

    const setContentRef = (el: HTMLDivElement) => {
        setContentEl(el);
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        // if the click is inside the trigger or content, do nothing.
        if (
            (triggerEl() && triggerEl()!.contains(target)) ||
            (contentEl() && contentEl()!.contains(target))
        ) {
            return;
        }
        close();
    };

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onCleanup(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    return (
        <DropdownContext.Provider
            value={{ open, toggle, close, setTriggerRef, setContentRef, triggerEl, contentEl }}
        >
            {props.children}
        </DropdownContext.Provider>
    );
};

// export
export { DropdownTrigger, DropdownContent, DropdownItem, DropdownRoot };
