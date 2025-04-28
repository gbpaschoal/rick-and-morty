import React from 'react'
import { createPortal } from 'react-dom'
import * as Icon from '../assets/icons'
import _ from 'lodash'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Overlay } from './Overlay'

export const SearchModalContext = React.createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
})

export const SearchModalProvider = ({ children }: { children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const openModal = React.useCallback(() => {
    if(!isOpen) {
      setIsOpen(true)
      document.body.style.overflow = 'hidden'
    }

  }, [isOpen])

  const closeModal = React.useCallback(() => {
    if(isOpen) {
      setIsOpen(false)
      document.body.style.overflow = ''
    }

  }, [isOpen])

  const searchControls = React.useMemo(()=>({
    isOpen,
    openModal,
    closeModal
  }), [isOpen, openModal, closeModal])

  return (
      <SearchModalContext.Provider value={searchControls}>
        {/* <SearchPortal/> */}
        {children}
      </SearchModalContext.Provider>
  )

}


export function SearchModalOverlay({ children }: { children: React.ReactNode }) {
  const { closeModal } = React.useContext(SearchModalContext)
  return (
    <Overlay closeModal={closeModal}>
      {children}
    </Overlay>
  )
}

export function SearchModal() {
  const [q, setQ] = React.useState('');
  const [searchParams, setSearchParams] = useSearchParams()
  const { closeModal } = React.useContext(SearchModalContext)

  const { data: characters } = useQuery({queryKey: ['search', q], queryFn: async () => {
    const BASE_URL = 'https://rickandmortyapi.com/api/character/';
    if (q.trim() === '') return;

    const { data } = await axios.get(`${BASE_URL}?name=${q}`)
    const shortVersion = data.results.slice(0, 10)
    return shortVersion

  }})


  return (
      <div className="mt-16 w-full max-w-[36rem] bg-gray-800 rounded-lg shadow-lg shadow-gray-700/40">
        <div className="border-b-2 border-gray-700 px-4">
          <form onSubmit={(e) => {
            e.preventDefault()
            searchParams.set('name', q)
            setSearchParams(searchParams)
            closeModal()
          }}>
            <div className="flex items-center gap-x-2">
              <Icon.Search className="mt-[1px] size-[1.4rem] fill-gray-400" />
              <input
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
                type="text"
                className="w-full h-14 outline-none border-none bg-transparent
                text-gray-200 placeholder:text-gray-400"
                placeholder="Search Characters"
                autoFocus
              />
            </div>
          </form>
        </div>
        <div className="min-h-[19rem] pb-4">
          <ul className="max-h-[22rem] flex flex-col overflow-y-scroll">
            {characters &&
              characters.map((data: any) => (
            <li key={data.id} className="bg-gray-800 hover:bg-gray-700 rounded-sm flex
              p-1 px-2 items-center"
              onClick={() => {
                searchParams.set('name', data.name)
                setSearchParams(searchParams)
              }}>
              <div className="flex gap-x-2">
                <div className="max-w-[4.4rem] rounded-lg overflow-hidden">
                  <img className="w-full" src={data.image} alt={data.name} />
                </div>
                <div className="flex flex-col py-2">
                  <span
                    className="text-lg leading-none font-bold text-gray-200
                  hyphens-auto break-words">
                    {data.name}
                  </span>
                  <span className="text-gray-300">{data.species}</span>
                </div>
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
  )
}

export function SearchPortal () {
  const { isOpen } = React.useContext(SearchModalContext)

  return (
    <>
      {isOpen && createPortal(
          <SearchModalOverlay>
            <SearchModal/>
          </SearchModalOverlay>,
          document.body
        )}
    </>
  )
}