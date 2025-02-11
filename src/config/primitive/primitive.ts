// imports
import { JSX } from "solid-js";

/** 
 ========= ELEMENT STARTS ===========
**/

// Button
type ButtonElement = HTMLButtonElement;
type PrimitveButtonProps = JSX.IntrinsicElements["button"];

// Input Field
type InputElement = HTMLInputElement;
type PrimitiveInputProps = JSX.IntrinsicElements['input'];

// Div
type DivElement = HTMLDivElement;
type PrimitiveDivProps = JSX.IntrinsicElements['div'];

// Span
type SpanElement = HTMLSpanElement;
type PrimitiveSpanProps = JSX.IntrinsicElements['span'];

/**
 ========= ELEMENT ENDS =============
**/

// exports
export type {
    ButtonElement,
    PrimitveButtonProps,
    InputElement,
    PrimitiveInputProps,
    DivElement,
    PrimitiveDivProps,
    SpanElement,
    PrimitiveSpanProps
};
