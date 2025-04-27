import * as React from 'react'

export default function Button ({
  children,
  ...rest
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
      <button
        {...rest}
        className="inline-grid place-items-center bg-primary py-2 px-4 md:py-3 md:px-5
        rounded-full cursor-pointer">
        {children}
      </button>
  )
}