// Imports 
import { InputType, Shape } from '@Configs/constants';
import { InputElement, PrimitiveInputProps } from '@Configs/primitive';
import { children, Component, JSX, splitProps } from 'solid-js';
import { cn } from '@/utils';

// Switch Props
interface SwitchFieldProps extends PrimitiveInputProps {
    id?: string;
    class?: string;
    shape?: (typeof Shape)[keyof typeof Shape]; // shape will be the union of the Shape values not keys
    icon?: JSX.Element;
    ref?: (el: InputElement) => void;
    children?: JSX.Element;
    knobStyle?: string;
    switchStyle?: string;
}

// Switch Component
const SwitchField: Component<SwitchFieldProps> = (props) => {
    // separate our special props from the rest
    const [local, others] = splitProps(props, [
        'id',
        'class',
        'ref',
        'shape',
        'icon',
        'children',
        'knobStyle',
        'switchStyle'
    ]);

    const icon = children(() => props?.icon);

    return (
        <div class={cn('my-3', local?.switchStyle)}>
            {/* switch container */}
            <label class={cn('relative inline-block cursor-pointer')}>
                {/* hidden checkbox (the actual input) */}
                <input
                    {...others}
                    type={InputType.CHECKBOX}
                    id={local.id}
                    ref={local.ref}
                    class="peer sr-only"
                />
                {/* slider track */}
                <div class={cn(`w-14 h-8 bg-gray-200 ${local?.shape === Shape?.FLAT ? 'rounded-sm' : local?.shape === Shape?.ROUNDED ? 'rounded-full' : 'rounded-sm'} transition-colors duration-300  peer-focus:ring-black peer-checked:bg-black`, local?.class)}></div>
                {/* slider knob */}
                <div class={cn(`absolute left-1 top-1 w-6 h-6 bg-white ${local?.shape === Shape?.FLAT ? 'rounded-sm' : local?.shape === Shape?.ROUNDED ? 'rounded-full' : 'rounded-sm'} transition-transform duration-300 transform peer-checked:translate-x-6 flex items-center justify-center`, local?.knobStyle)}>
                    {icon()}
                </div>
            </label>
        </div>
    );
};

// Export
export { SwitchField };
