import React from 'react';
import CardCharacter from '@/components/CardCharacter/CardCharacter';
import SearchModal from '@/components/SearchModal/SearchModal';
import * as Icon from '@/assets/icons';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getAllCharacters } from '@/services/rick-and-morty.api';

export default function Characters() {
  const {
    results: characters,
    totalCharacters,
    setObserverRef,
    isLoading,
  } = useInfiniteScroll(getAllCharacters);
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-y-3 mb-12">
        {isOpen && <SearchModal isOpen={isOpen} onClose={onClose} />}
        <h1
          className="mb-10 sm:mb-0 font-extrabold text-center text-light-300
         text-[clamp(2rem,_7vw,_3.6rem)] leading-none tracking-tight">
          Rick and Morty <br /> Characters
        </h1>
        <div
          onClick={() => setIsOpen(true)}
          className="w-full max-w-xl mx-auto
          bg-gray-800 rounded-xl px-4 border-1 border-gray-600
          hover:bg-gray-700 cursor-pointer transition-opacity">
          <form>
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
          </form>
        </div>
      </div>
      <div>
        {isLoading && totalCharacters === 0 && (
          <div className="mx-auto text-center text-light-300/60">
            Loading...
          </div>
        )}

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
    </div>
  );
}
