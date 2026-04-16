"use client";

import { type ComponentType, type HTMLAttributes, type ReactNode, type Ref, createContext, useContext } from "react";
import { HelpCircle, InfoCircle } from "@untitledui/icons";
import type { InputProps as AriaInputProps, TextFieldProps as AriaTextFieldProps } from "react-aria-components";
import { Group as AriaGroup, Input as AriaInput, TextField as AriaTextField } from "react-aria-components";
import { HintText } from "@/components/ui/base/input/hint-text";
import { Label } from "@/components/ui/base/input/label";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx, sortCx } from "@/utils/cx";

export interface InputBaseProps extends TextFieldProps {
    /** Tooltip message on hover. */
    tooltip?: string;
    /**
     * Input size.
     * @default "sm"
     */
    size?: "sm" | "md";
    /** Placeholder text. */
    placeholder?: string;
    /** Class name for the icon. */
    iconClassName?: string;
    /** Class name for the input. */
    inputClassName?: string;
    /** Class name for the input wrapper. */
    wrapperClassName?: string;
    /** Class name for the tooltip. */
    tooltipClassName?: string;
    /** Keyboard shortcut to display. */
    shortcut?: string | boolean;
    ref?: Ref<HTMLInputElement>;
    groupRef?: Ref<HTMLDivElement>;
    /** Icon component to display on the left side of the input. */
    icon?: ComponentType<HTMLAttributes<HTMLOrSVGElement>>;
    /** Native input attributes (min, max, step, type, etc.) */
    min?: number;
    max?: number;
    step?: number | string;
}

export const InputBase = ({
    ref,
    tooltip,
    shortcut,
    groupRef,
    size = "sm",
    isInvalid,
    isDisabled,
    icon: Icon,
    placeholder,
    wrapperClassName,
    tooltipClassName,
    inputClassName,
    iconClassName,
    ...inputProps
}: Omit<InputBaseProps, "label" | "hint" | "isRequired">) => {
    const hasTrailingIcon = tooltip || isInvalid;
    const hasLeadingIcon = Icon;

    const context = useContext(TextFieldContext);

    const inputSize = context?.size || size;

    const sizes = sortCx({
        sm: {
            root: cx("px-3 py-2", hasTrailingIcon && "pr-9", hasLeadingIcon && "pl-10"),
            iconLeading: "left-3",
            iconTrailing: "right-3",
            shortcut: "pr-2.5",
        },
        md: {
            root: cx("px-3.5 py-2.5", hasTrailingIcon && "pr-9.5", hasLeadingIcon && "pl-10.5"),
            iconLeading: "left-3.5",
            iconTrailing: "right-3.5",
            shortcut: "pr-3",
        },
    });

    return (
        <AriaGroup
            {...{ isDisabled, isInvalid }}
            ref={groupRef}
            className={({ isFocusWithin, isDisabled, isInvalid }) =>
                cx(
                    "relative flex w-full flex-row place-content-center place-items-center rounded-lg border border-surface-stroke bg-surface-bg font-body text-text-primary shadow-xs ring-1 ring-surface-stroke ring-inset transition-shadow duration-100 ease-linear",
                    isFocusWithin && !isDisabled && "ring-2 ring-system-brand outline-none",
                    isDisabled && "cursor-not-allowed opacity-60 ring-surface-stroke",
                    "group-disabled:cursor-not-allowed group-disabled:opacity-60 group-disabled:ring-surface-stroke",
                    isInvalid && "ring-system-error",
                    "group-invalid:ring-system-error",
                    isInvalid && isFocusWithin && "ring-2 ring-system-error",
                    isFocusWithin && "group-invalid:ring-2 group-invalid:ring-system-error",
                    context?.wrapperClassName,
                    wrapperClassName,
                )
            }
        >
            {Icon && (
                <Icon
                    className={cx(
                        "pointer-events-none absolute size-5 text-text-tertiary",
                        isDisabled && "opacity-60",
                        sizes[inputSize].iconLeading,
                        context?.iconClassName,
                        iconClassName,
                    )}
                />
            )}

            <AriaInput
                {...(inputProps as AriaInputProps)}
                ref={ref}
                placeholder={placeholder}
                className={cx(
                    "m-0 w-full min-h-10 bg-transparent text-small font-body text-text-primary ring-0 outline-none placeholder:text-text-tertiary autofill:rounded-lg autofill:text-text-primary",
                    isDisabled && "cursor-not-allowed opacity-60",
                    sizes[inputSize].root,
                    context?.inputClassName,
                    inputClassName,
                )}
            />

            {tooltip && !isInvalid && (
                <Tooltip title={tooltip} placement="top">
                    <TooltipTrigger
                        className={cx(
                            "absolute cursor-pointer text-text-tertiary transition duration-200 hover:text-text-secondary focus:text-text-secondary",
                            sizes[inputSize].iconTrailing,
                            context?.tooltipClassName,
                            tooltipClassName,
                        )}
                    >
                        <HelpCircle className="size-4" />
                    </TooltipTrigger>
                </Tooltip>
            )}

            {isInvalid && (
                <InfoCircle
                    className={cx(
                        "pointer-events-none absolute size-4 text-system-error",
                        sizes[inputSize].iconTrailing,
                        context?.tooltipClassName,
                        tooltipClassName,
                    )}
                />
            )}

            {shortcut && (
                <div
                    className={cx(
                        "pointer-events-none absolute inset-y-0.5 right-0.5 z-10 flex items-center rounded-r-[inherit] bg-linear-to-r from-transparent to-surface-bg to-40% pl-8",
                        sizes[inputSize].shortcut,
                    )}
                >
                    <span
                        className={cx(
                            "pointer-events-none rounded px-1 py-px text-xs font-medium text-text-tertiary ring-1 ring-surface-stroke select-none ring-inset",
                            isDisabled && "bg-transparent opacity-60",
                        )}
                        aria-hidden="true"
                    >
                        {typeof shortcut === "string" ? shortcut : "⌘K"}
                    </span>
                </div>
            )}
        </AriaGroup>
    );
};

InputBase.displayName = "InputBase";

interface BaseProps {
    /** Label text for the input */
    label?: string;
    /** Helper text displayed below the input */
    hint?: ReactNode;
}

interface TextFieldProps
    extends BaseProps,
        AriaTextFieldProps,
        Pick<InputBaseProps, "size" | "wrapperClassName" | "inputClassName" | "iconClassName" | "tooltipClassName"> {
    ref?: Ref<HTMLDivElement>;
}

const TextFieldContext = createContext<TextFieldProps>({});

export const TextField = ({ className, ...props }: TextFieldProps) => {
    return (
        <TextFieldContext.Provider value={props}>
            <AriaTextField
                {...props}
                data-input-wrapper
                className={(state) =>
                    cx("group flex h-max w-full flex-col items-start justify-start gap-1.5", typeof className === "function" ? className(state) : className)
                }
            />
        </TextFieldContext.Provider>
    );
};

TextField.displayName = "TextField";

interface InputProps extends InputBaseProps, BaseProps {
    /** Whether to hide required indicator from label */
    hideRequiredIndicator?: boolean;
}

export const Input = ({
    size = "sm",
    placeholder,
    icon: Icon,
    label,
    hint,
    shortcut,
    hideRequiredIndicator,
    className,
    ref,
    groupRef,
    tooltip,
    iconClassName,
    inputClassName,
    wrapperClassName,
    tooltipClassName,
    ...props
}: InputProps) => {
    return (
        <TextField aria-label={!label ? placeholder : undefined} {...props} className={className}>
            {({ isRequired, isInvalid, isDisabled }) => (
                <>
                    {label && <Label isRequired={hideRequiredIndicator ? !hideRequiredIndicator : isRequired}>{label}</Label>}

                    <InputBase
                        {...{
                            ref,
                            groupRef,
                            size,
                            placeholder,
                            icon: Icon,
                            shortcut,
                            iconClassName,
                            inputClassName,
                            wrapperClassName,
                            tooltipClassName,
                            tooltip,
                            isInvalid,
                            isDisabled,
                        }}
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

Input.displayName = "Input";
