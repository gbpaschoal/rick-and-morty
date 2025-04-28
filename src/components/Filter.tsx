import React from 'react'
import * as Icon from '../assets/icons'
import FilterModal from './Filter/FilterModal'

export const FilterContext = React.createContext({})
export function FilterProvider({children}: {children: React.ReactNode}) {
  return (
    <FilterContext.Provider value={({})}>{children}</FilterContext.Provider>
  )
}

export default function Filter() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      {isOpen && <FilterModal />}
      <button
        className="inline-grid place-items-center size-14 md:size-16 bg-white rounded-full"
        onClick={() => setIsOpen((prev) => !prev)}>
          <Icon.Filter className="size-[1.5rem] mx-auto fill-black"/>
      </button>
    </>
  )
}
