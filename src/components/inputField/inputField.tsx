// imports
import { children, Component, JSX, Show, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { InputElement, PrimitiveInputProps } from '@Configs/primitive';
import { cn } from '@/utils';
import { ErrorMessage } from '../errorMessage';

// InputField props
interface InputfieldWrapperProps extends PrimitiveInputProps {
    isError?: boolean;
    errorMessage?: string;
    id?: string;
    label?: JSX.Element;
    labelStyle?: string;
    asChild?: keyof JSX.IntrinsicElements | Component<any>;
    children?: JSX.Element;
    ref?: (el: InputElement) => void;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    class?: string
}

// InputField Component
const InputField: Component<InputfieldWrapperProps> = (props) => {
    // separate our special props from the rest
    const [local, others] = splitProps(props, ['id', 'asChild', 'ref', 'children', 'iconLeft', 'iconRight', "label", 'labelStyle', "isError", "errorMessage", 'class']);

    // handle JSX props as a "children" accessor for reactivity if needed
    const label = children(() => props?.label);
    const iconLeft = children(() => props?.iconLeft);
    const iconRight = children(() => props?.iconRight);

    return (
        <div class='my-3'>
            <Show when={label()}>
                <label class={cn('text-gray-600 text-[0.9rem] font-medium', local?.labelStyle)} for={local?.id}>
                    {label()}
                </label>
            </Show>
            <div class={cn('cursor-pointer rounded-sm ring-1 ring-warm focus-within:ring-warm duration-700 bg-white my-2 flex items-center justify-start', local?.class)}>
                <Show when={iconLeft()}>
                    <div class='pl-2'>{iconLeft()}</div>
                </Show>
                <Dynamic component={local.asChild || 'input'} ref={local.ref} class={cn("outline-none cursor-pointer p-4 rounded-2xl text-sm w-full mx-auto")} {...others}>
                    {local.children}
                </Dynamic>
                <Show when={iconRight()}>
                    <div class='pr-2'>{iconRight()}
                    </div>
                </Show>
            </div>
            <Show when={local?.isError}>
                <ErrorMessage class={cn("text-sm text-red-500 font-medium")}>{local?.errorMessage}</ErrorMessage>
            </Show>
        </div>
    );
};

// export
export { InputField };
