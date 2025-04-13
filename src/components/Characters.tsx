import * as React from 'react';
import CardCharacter from './CardCharacter';
import * as Icon from './../assets/icons';
import { ICharacter } from './../types/Characters';
import axios from 'axios'
import clsx from 'clsx';
import _ from 'lodash';

function SearchBar() {
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
                <li key={data.id} className="p-2 rounded-lg text-base text-[var(--light-200)] hover:bg-[var(--dark-300)]"> {data.name} </li>
              ))}
          </ul>
      </div>
    </div>
  )
}

function useFetchCharacters () {
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const page = React.useRef(1)
  const hasMounted = React.useRef(false);
  const hasDone = React.useRef(false)

  const fetchCharacters = async () => {
    const BASE_URL = 'https://rickandmortyapi.com/api/character/';
    try {
      if(hasDone.current) return
      if(isLoading) return
      setIsLoading(true)

      const { data } = await axios.get(`${BASE_URL}?page=${page.current}`)

      setCharacters(prev => [...prev, ...data.results])
      hasDone.current = data.info.count === characters.length
      page.current += 1

    } catch (error) {
      console.log(error)
    } finally { setIsLoading(false) }
  }

  React.useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    fetchCharacters();

}, []);


  return ({characters, isLoading, fetchCharacters})
}

// function useIntersectionObserver(func: () => Promise<void>, options?: IntersectionObserverInit) {
//   const observer = React.useRef<IntersectionObserver | null>(null);
//   const isFetchingRef = React.useRef(false); // ✅

//   const refCallback = React.useCallback((node: HTMLElement | null) => {
//     if (observer.current) {
//       observer.current.disconnect();
//     }

//     if (node) {
//       observer.current = new IntersectionObserver(
//         async ([entry]) => {
//           if (entry.isIntersecting && !isFetchingRef.current) {
//             isFetchingRef.current = true;
//             await func();
//             isFetchingRef.current = false;
//           }
//         },
//         { rootMargin: '200px', ...options }
//       );
//       observer.current.observe(node);
//     }
//   }, [func, options]);

//   return refCallback;
// }

function useIntersectionObserver(func: () => Promise<void>) {
  const [observerRef, setObserverRef] = React.useState<HTMLElement | null>(null);
  const isFetchingRef = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
          if (entry.isIntersecting && !isFetchingRef.current) {
            isFetchingRef.current = true;
            await func();
            isFetchingRef.current = false;
          }
      },
      { rootMargin: '200px' }
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.disconnect;
      }
    };
  }, [observerRef]);

  return setObserverRef
}

export default function Characters () {
  const { characters, isLoading, fetchCharacters } = useFetchCharacters()
  const setObserverRef = useIntersectionObserver(fetchCharacters)

  React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

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
      <ul
        className="gap-1 grid grid-cols-2 sm:grid-cols-3
      md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full">
        {characters?.map((character, index) => {
          const isTheLastOne = characters.length - 1 === index;
            if (isTheLastOne) {
              return (
                <li key={character.id} ref={setObserverRef}>
                  <CardCharacter data={character} />
                </li>
              );
            }
          return (
            <li key={character.id}>
              <CardCharacter data={character} />
            </li>
          );
        })}
      </ul>
    </div>
  );

}



