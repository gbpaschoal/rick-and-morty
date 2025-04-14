import React from 'react'
import { SearchBar } from './Search'
import Characters from './Characters'

export default function Hero() {
  return (
    <div className='flex flex-col gap-y-6 items-center'>
      <div className="flex flex-col gap-y-4 items-center">
        <h1
          className="font-extrabold text-center text-light-300
          text-[clamp(2rem,_7vw,_3.6rem)] leading-none tracking-tight">
          Rick and Morty <br /> Characters
        </h1>
        <div className="mb-4">
          <SearchBar/>
        </div>
      </div>
      <Characters/>
    </div>
  )
}
