import React from 'react';
import CardCharacter from './CardCharacter';
import SearchModal from './SearchModal/SearchModal';
import * as Icon from './../assets/icons';
import { getAllCharacters } from './../services/rick-and-morty.api';
import { useSearchParams } from 'react-router-dom';
import { ICharacter } from './../types/Characters';
import _ from 'lodash';

export default function Characters() {
  const [characters, setCharacters] = React.useState<ICharacter[]>([]);
  const [page, setPage] = React.useState(2);
  const [isLoading, setIsLoading] = React.useState(false);
  const [observerRef, setObserverRef] = React.useState<Element | null>(null);
  const [totalCharacters, setTotalCharacters] = React.useState(0);
  const [searchParams] = useSearchParams();
  const controllerRef = React.useRef<AbortController | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const fetchNewPage = async () => {
    if (isLoading) return;

    controllerRef.current && controllerRef.current.abort();

    setIsLoading(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const data = await getAllCharacters(
        `?page=${page}&${searchParams.toString()}`,
        controller.signal
      );

      if (data) {
        setCharacters((prev) => _.uniqBy([...prev, ...data.results], 'id'));
        setTotalCharacters(data.info.count);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('');
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          let retries = 0;
          while (retries <= 3) {
            try {
              setIsLoading(true);
              await fetchNewPage();
              setIsLoading(false);

              break;
            } catch (error) {
              console.log('tentando novamente', retries);
              retries++;
            }
          }
        }
      },
      { rootMargin: '200px' }
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [observerRef]);

  React.useEffect(() => {
    controllerRef.current && controllerRef.current.abort();

    setIsLoading(true);
    setCharacters([]);
    setPage(2);

    let timeId: ReturnType<typeof setTimeout>;

    const controller = new AbortController();
    controllerRef.current = controller;

    getAllCharacters(`?page=1&${searchParams.toString()}`, controller.signal)
      .then((data) => {
        if (data) {
          timeId = setTimeout(() => {
            setCharacters((prev) => [...prev, ...data.results]);
            setTotalCharacters(data.info.count);
            setIsLoading(false);
          }, 200);
        }
      })
      .catch((error) => console.log(error));

    window.scrollTo(0, 0);

    return () => {
      controller.abort();
      clearTimeout(timeId);
    };
  }, [searchParams]);

  return (
    <>
      <div className='mt-16 flex flex-col gap-y-6'>
        <div>
          <h1
            className="font-extrabold text-center text-light-300
          text-[clamp(2rem,_7vw,_3.6rem)] leading-none tracking-tight">
            Rick and Morty <br /> Characters
          </h1>
          <div
            className="hidden sm:block w-full max-w-xl mx-auto
            bg-[#121212] rounded-xl px-4 border-1 border-gray-600
            hover:bg-gray-700 cursor-pointer transition-opacity">
            <div className="flex items-center">
              <div className="w-full flex items-center gap-x-2">
                <Icon.Search className="mt-[1px] fill-light-100/60" />
                <input
                  className="w-full h-12 outline-none border-none bg-transparent
                    flex-1 text-light-100 placeholder:text-light-100/60 cursor-pointer"
                  type="text"
                  placeholder="Search Characters"
                />
              </div>
            </div>
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
        {totalCharacters === characters.length && !isLoading && (
          <div className="mx-auto text-center text-light-300/60 my-10">
            No more
          </div>
        )}
      </div>
    </>
  );
}
