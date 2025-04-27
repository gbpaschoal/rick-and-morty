import React from 'react'
import Filter from './Filter'
import * as Icon from '../assets/icons'

export default function NavFooter() {
  return (
    <div className="wrapper bg-special z-3 fixed bottom-0 left-0 w-full
        pointer-events-none flex flex-row gap-2
        justify-end items-center py-4 *:pointer-events-auto">
        <button className="inline-grid place-items-center size-14 md:size-16 bg-primary rounded-full"
        onClick={() => {
          window.scrollTo(0, 0)
        }}>
          <Icon.ArrowToUp className="size-[1.5rem] fill-white"/>
        </button>
        <Filter/>
      </div>
  )
}
