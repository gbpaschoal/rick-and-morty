import React from "react";
import * as Router from 'react-router-dom';
import * as Icon from './../assets/icons';
import { ICharacter } from "../types/Characters";
import clsx from "clsx";
import axios from 'axios'
import _ from 'lodash';



export function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const inputRef = React.useRef(null)
  const [q, setQ] = React.useState('');
  React.useEffect(()=>{
    window.addEventListener("click", (e) => {
      if(e.target !== inputRef.current) {
        setOpen(false)
      }
    })

    return () => {
      window.addEventListener("click", (e) => {
      if(e.target !== inputRef.current) {
        setOpen(false)
      }
    })
    }
  }, [])

  const [charactersList, setCharactersList] = React.useState<ICharacter[]>([]);
  const fetchCharactersByQuery = async (q: string): Promise<void> => {
    const BASE_URL = 'https://rickandmortyapi.com/api/character/';

    if (q.trim() === '') {
      setCharactersList([]);
      return;
    }

    try {
      //@ts-ignore
      const { data } = await axios.get(`${BASE_URL}?name=${q}`)
      const shortVersion = data.results.slice(0, 4)
      if (data) setCharactersList(shortVersion);
    } catch (error) {
      setCharactersList([]);
    }
  };

  const delayedFetchCharacters = _.debounce(fetchCharactersByQuery, 250);

    React.useEffect(() => {
    delayedFetchCharacters(q);
  }, [q]);

  return (
    <div className={clsx(
        "relative w-full max-w-[31rem] bg-gray-900 rounded-xl px-4",
        open && "bg-gray-800",
        "hover:bg-gray-800 cursor-pointer"
      )}>
      <div className="w-full flex items-center gap-x-2">
        <Icon.Search className="mt-[1px] ml-[6px] size-[1.5rem] fill-gray-400" />
        <input className="w-full h-12 outline-none border-none bg-transparent
            flex-1 text-gray-200 placeholder:text-gray-400
            cursor-pointer"
          ref={inputRef}
          onChange={(e) => {
            setQ(e.target.value);
          }}
          onFocus={() => setOpen(true)}
          type="text"
          placeholder="Search Characters"
        />
      </div>
      <div className={clsx(
        "bg-gray-800 absolute top-14 left-0",
        open && q && charactersList.length > 0 ? "block" : "hidden",
        "w-full z-3 rounded-xl py-3"
        )}>
          <ul className="w-full max-h-[22rem] flex flex-col *:w-full *:flex
            *:justify-start">
            {charactersList &&
              charactersList.map((data: ICharacter) => (
                // <li key={data.id} className="px-3 py-2 text-base
                // text-[var(--gray-200)] hover:bg-[var(--gray-800)]
                // *:w-full">
                //   <Router.Link to={`results/${data.name}`}>{data.name}</Router.Link>
                // </li>
                    <li>
                    <div className="w-full bg-gray-800 hover:bg-gray-700 rounded-sm flex
                    p-1 items-center">
                      <div className="flex gap-x-2">
                        <div className="max-w-20 rounded-lg overflow-hidden">
                          <img className="w-full" src={data.image} alt={data.name} />
                        </div>
                        <div className="flex flex-col py-2">
                          <span
                            className="text-xl leading-none font-bold text-gray-100
                          hyphens-auto break-words">
                            {data.name}
                          </span>
                          <span className="text-gray-200">{data.species}</span>
                        </div>
                      </div>
                      <div>
                        {/* <ButtonFavorite data={data} /> */}
                      </div>
                    </div>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  )
}