import * as React from 'react'

export default function Button ({
  children,
  onClick
}: {
  children: React.ReactNode,
  onClick?: React.MouseEventHandler
  }) {
  return (
      <div
        onClick={onClick}
        className="w-max bg-primary text-white py-2 px-4 md:py-3 md:px-5
        rounded-full cursor-pointer">
        {children}
      </div>
  )
}