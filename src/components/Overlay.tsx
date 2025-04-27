import React from 'react'
import * as Icon from '../assets/icons'

export function Overlay({ children, closeModal }) {
  return (
      <div className="fixed z-4 inset-0 flex flex-col px-4 items-center">
        <div className="absolute inset-0 -z-1 bg-gray-800/80 backdrop-blur-md"
          onClick={closeModal}>
          <button className="ml-auto grid place-items-center z-3 p-4">
            <Icon.Close className="fill-gray-200 hover:fill-white" />
          </button>
        </div>
        {children}
      </div>
    )
}
