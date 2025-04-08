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
        className="w-max bg-[var(--primary)] text-[var(--light)] py-3 px-6
        rounded-full cursor-pointer">
        {children}
      </div>
  )
}