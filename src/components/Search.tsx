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
      const shortVersion = data.results.slice(0, 6)
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
        "relative w-[32rem] bg-[var(--dark-100)] rounded-xl px-4",
        open && "bg-[var(--dark-200)]",
        "hover:bg-[var(--dark-200)] cursor-pointer transition-opacity"
      )}>
      <div className="w-full flex items-center gap-x-2">
        <Icon.Search className="mt-[1px] fill-[var(--dark-600)]" />
        <input className="w-full h-12 outline-none border-none bg-transparent
            flex-1 text-[var(--light-200) placeholder:text-[var(--dark-600)]
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
        "bg-[var(--dark-200)] absolute top-14 left-0",
        open && q && charactersList.length > 0 ? "block" : "hidden",
        "w-full z-3 rounded-xl"
        )}>
          <ul className="w-full max-h-[22rem] flex flex-col *:w-full *:flex
            *:justify-start p-2">
            {charactersList &&
              charactersList.map((data: ICharacter) => (
                <li key={data.id} className="p-2 rounded-lg text-base
                text-[var(--light-200)] hover:bg-[var(--dark-300)]
                *:w-full">
                  <Router.Link to={`results/${data.name}`}>{data.name}</Router.Link>
                </li>
              ))}
          </ul>
      </div>
    </div>
  )
}