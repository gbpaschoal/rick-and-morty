import GridContainer from './GridContainer'
import { useFetchCharacters } from '../hooks/useFetchCharacters'
import React from 'react'
import { SearchModalContext } from './Search'
import clsx from 'clsx'
import * as Icon from '../assets/icons'

const SearchBar = () => {
  const {openModal} = React.useContext(SearchModalContext)

  return (
    <div className={clsx(
        "relative max-sm:hidden w-full max-w-[31rem] bg-gray-900 rounded-xl px-4",
        "bg-gray-800",
        "hover:bg-gray-800 cursor-pointer"
      )}
      onClick={openModal}>
      <div className="w-full flex items-center gap-x-2">
        <Icon.Search className="mt-[1px] ml-[6px] size-[1.5rem] fill-gray-400" />
        <div className="w-full inline-flex items-center h-12 outline-none border-none bg-transparent
            flex-1 text-gray-400
            cursor-pointer">
            Search Characters
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const {data, state, fetchNextPage} = useFetchCharacters()

  return (
    <div className='flex flex-col gap-y-6 items-center'>
      <div className="w-full flex flex-col gap-y-4 items-center mb-4 px-2">
        <h1 className="font-extrabold text-center text-gray-100
          text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-none
          tracking-tight">
          Rick and Morty <br /> Characters
        </h1>
        <SearchBar/>
      </div>
      <GridContainer
        data={data?.pages.flatMap(page => page.results)}
        state={state}
        fetchMore={fetchNextPage}/>
    </div>
  )
}
