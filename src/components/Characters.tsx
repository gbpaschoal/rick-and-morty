import * as React from 'react';
import CardCharacter from './CardCharacter';
import { ICharacter } from './../types/Characters';
import axios from 'axios'
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';

function useFetchCharacters (searchParams:any) {
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

      const { data } = await axios.get(`${BASE_URL}?page=${page.current}&${searchParams}`)

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

}, [searchParams]);


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
  const [searchParams] = useSearchParams()
  const { characters, isLoading, fetchCharacters } = useFetchCharacters(searchParams.toString())
  const setObserverRef = useIntersectionObserver(fetchCharacters)

  React.useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
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
  );

}



