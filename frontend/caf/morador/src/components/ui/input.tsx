"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    label?: string;
    Icon?: React.ElementType;
    iconClassName?: string;
    iconAction?: React.MouseEventHandler<HTMLDivElement>;
  }
>(
  (
    {
      className,
      type,
      label,
      onFocus,
      onBlur,
      Icon,
      iconClassName,
      iconAction,
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = React.useState(false);
    return (
      <div className="relative">
        <input
          id={props.id || props.name}
          type={type}
          className={cn(
            "flex h-10 w-full border z-10 border-input rounded-full text-white bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onFocus={(event) => {
            setFocused(true);
            onFocus && onFocus(event);
          }}
          onBlur={(event) => {
            setFocused(!!event.target.value);
            onBlur && onBlur(event);
          }}
          ref={ref}
          {...props}
        />
        {label && (
          <label
            className={cn(
              "text-white absolute top-1/2 -translate-y-1/2 left-3",
              {
                "animate-label-focus": focused,
                "animate-label-blur": !focused,
              }
            )}
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        )}
        {Icon && (
          <div
            className={cn(
              "text-white absolute top-1/2 -translate-y-1/2 right-3",
              iconClassName
            )}
            onClick={iconAction}
          >
            <Icon />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
