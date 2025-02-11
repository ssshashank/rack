// imports
import { Component, JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import { PrimitiveSpanProps } from "@Configs/primitive";

// Error Message Props
interface ErrorMessageProps extends PrimitiveSpanProps {
    children?: JSX.Element
}

// Error Message Component
const ErrorMessage: Component<ErrorMessageProps> = (props): JSX.Element => <Dynamic component={'span'} {...props}>{props?.children}</Dynamic>;

// export
export {
    ErrorMessage
};
