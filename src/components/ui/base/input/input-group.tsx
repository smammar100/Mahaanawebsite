"use client";

import { type HTMLAttributes, type ReactNode, cloneElement, isValidElement } from "react";
import { HintText } from "@/components/ui/base/input/hint-text";
import type { InputBaseProps } from "@/components/ui/base/input/input";
import { TextField } from "@/components/ui/base/input/input";
import { Label } from "@/components/ui/base/input/label";
import { cx, sortCx } from "@/utils/cx";

interface InputPrefixProps extends HTMLAttributes<HTMLDivElement> {
    /** The position of the prefix. */
    position?: "leading" | "trailing";
    /** The size of the prefix. */
    size?: "sm" | "md";
    /** Indicates that the prefix is disabled. */
    isDisabled?: boolean;
}

export const InputPrefix = ({ isDisabled, children, ...props }: InputPrefixProps) => (
    <span
        {...props}
        className={cx(
            "flex text-small font-body text-text-tertiary shadow-xs ring-1 ring-surface-stroke ring-inset",
            "in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-l-lg",
            "in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-r-lg",
            "in-data-input-wrapper:in-data-[input-size=md]:py-2.5 in-data-input-wrapper:in-data-[input-size=md]:pr-3 in-data-input-wrapper:in-data-[input-size=md]:pl-3.5 in-data-input-wrapper:in-data-[input-size=sm]:px-3 in-data-input-wrapper:in-data-[input-size=sm]:py-2",
            isDisabled && "opacity-60 bg-surface-bg text-text-tertiary",
            "in-data-input-wrapper:group-disabled:opacity-60 in-data-input-wrapper:group-disabled:text-text-tertiary in-data-input-wrapper:group-disabled:ring-surface-stroke",
            props.className,
        )}
    >
        {children}
    </span>
);

interface InputGroupProps extends Omit<InputBaseProps, "type" | "icon" | "placeholder" | "tooltip" | "shortcut" | `${string}ClassName`> {
    /** A prefix text that is displayed in the same box as the input.*/
    prefix?: string;
    /** A leading addon that is displayed with visual separation from the input. */
    leadingAddon?: ReactNode;
    /** A trailing addon that is displayed with visual separation from the input. */
    trailingAddon?: ReactNode;
    /** The class name to apply to the input group. */
    className?: string;
    /** The children of the input group (i.e `<InputBase />`) */
    children: ReactNode;
}

export const InputGroup = ({ size = "sm", prefix, leadingAddon, trailingAddon, label, hint, children, ...props }: InputGroupProps) => {
    const hasLeading = !!leadingAddon;
    const hasTrailing = !!trailingAddon;

    const paddings = sortCx({
        sm: {
            input: cx(
                hasLeading && "group-has-[&>select]:px-2.5 group-has-[&>select]:pl-2.5",
                hasTrailing && (prefix ? "group-has-[&>select]:pr-6 group-has-[&>select]:pl-0" : "group-has-[&>select]:pr-6 group-has-[&>select]:pl-3"),
            ),
            leadingText: "pl-3",
        },
        md: {
            input: cx(
                hasLeading && "group-has-[&>select]:px-3 group-has-[&>select]:pl-3",
                hasTrailing && (prefix ? "group-has-[&>select]:pr-6 group-has-[&>select]:pl-0" : "group-has-[&>select]:pr-6 group-has-[&>select]:pl-3"),
            ),
            leadingText: "pl-3.5",
        },
    });

    return (
        <TextField
            size={size}
            aria-label={label || undefined}
            inputClassName={cx(paddings[size].input)}
            tooltipClassName={cx(hasTrailing && !hasLeading && "group-has-[&>select]:right-0")}
            wrapperClassName={cx(
                "z-10",
                hasLeading && "rounded-l-none",
                hasTrailing && "rounded-r-none",
                "group-has-[&>select]:bg-transparent group-has-[&>select]:shadow-none group-has-[&>select]:ring-0 group-has-[&>select]:focus-within:ring-0",
                "group-disabled:group-has-[&>select]:bg-transparent",
            )}
            {...props}
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label isRequired={isRequired}>{label}</Label>}

                    <div
                        data-input-size={size}
                        className={cx(
                            "group relative flex h-max w-full flex-row justify-center rounded-lg border border-surface-stroke bg-surface-bg transition-all duration-100 ease-linear",
                            "has-[&>select]:shadow-xs has-[&>select]:ring-1 has-[&>select]:ring-surface-stroke has-[&>select]:ring-inset has-[&>select]:has-[input:focus]:ring-2 has-[&>select]:has-[input:focus]:ring-system-brand",
                            isDisabled && "cursor-not-allowed opacity-60 has-[&>select]:ring-surface-stroke",
                            isInvalid && "has-[&>select]:ring-system-error has-[&>select]:has-[input:focus]:ring-system-error",
                        )}
                    >
                        {leadingAddon && <section data-leading={hasLeading || undefined}>{leadingAddon}</section>}

                        {prefix && (
                            <span className={cx("my-auto grow pr-2", paddings[size].leadingText)}>
                                <p className={cx("text-small font-body text-text-tertiary", isDisabled && "opacity-60")}>{prefix}</p>
                            </span>
                        )}

                        {isValidElement(children) ? cloneElement(children as React.ReactElement<{ isDisabled?: boolean; isInvalid?: boolean }>, { isDisabled, isInvalid }) : children}

                        {trailingAddon && <section data-trailing={hasTrailing || undefined}>{trailingAddon}</section>}
                    </div>

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

InputGroup.Prefix = InputPrefix;

InputGroup.displayName = "InputGroup";
