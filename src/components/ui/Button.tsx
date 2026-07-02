import type React from "react";
import { createElement } from "react";
import { twMerge } from "tailwind-merge";

type ButtonOwnProps<T extends React.ElementType = "button"> = {
  as?: T;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type ButtonProps<T extends React.ElementType = "button"> = ButtonOwnProps<T> &
  Omit<React.ComponentPropsWithRef<T>, keyof ButtonOwnProps<T>>;

const variantsStyles = {
  primary: "bg-primary text-gray-100 hover:bg-primary/90",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-gray-100",
};

const baseStyles =
  "group grid size-14 place-items-center cursor-pointer rounded-full transition-all";

export function Button<T extends React.ElementType = "button">({
  as,
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || "button";
  return createElement(
    Component,
    {
      className: twMerge(baseStyles, variantsStyles[variant], className),
      ...props,
    },
    children,
  );
}
