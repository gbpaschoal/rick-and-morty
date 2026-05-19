import type React from "react";

export function Button({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={`relative flex-x cursor-pointer gap-x-2 rounded-4xl px-4 py-2
      text-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
