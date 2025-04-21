import React from 'react'
import * as Icon from '../assets/icons'
import FilterModal from './Filter/FilterModal'

export default function Filter() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div>
      {isOpen && <FilterModal />}
      <button
        className="size-14 md:size-16 bg-white rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}>
          <Icon.Filter
          className="size-[1.5rem] mx-auto fill-black"/>
      </button>
    </div>
  )
}
