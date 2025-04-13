import React from 'react'
import * as Icon from '../assets/icons'
import FilterModal from './Filter/FilterModal'

export default function Filter() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div>
      {isOpen && <FilterModal />}
      <button
        className="p-5 bg-[var(--light)]
        transition-colors
        rounded-full justify-self-start"
        onClick={() => setIsOpen((prev) => !prev)}>
          <Icon.Filter
          className="size-7 fill-[var(--dark)]"/>
      </button>
    </div>
  )
}
