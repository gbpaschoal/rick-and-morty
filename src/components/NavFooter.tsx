import React from 'react'
import Filter from './Filter'
import * as Icon from '../assets/icons'

export default function NavFooter() {
  return (
    <div className="wrapper bg-special z-3 fixed bottom-0 left-0 w-full
        pointer-events-none flex flex-col items-end md:flex-row gap-2
        md:justify-end md:items-center py-3 *:pointer-events-auto">
        <button
          className="size-14 md:size-16 bg-primary rounded-full">
          <Icon.ArrowToUp className="size-[1.5rem] mx-auto fill-white"/>
        </button>
        <Filter/>
      </div>
  )
}
