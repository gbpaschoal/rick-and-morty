// Components
import Filter from '@/components/main/Filter';
import SearchBar from '@/components/SearchBar';
import CardCharacter from '@/components/card/CardCharacter';

// Types

// Functions
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getAllCharacters } from '@/services/api';
// import { BadRequest } from './errors';

export default function Characters() {
  const {
    results: characters,
    totalCharacters,
    setLastCharacterFakeRef,
    isLoading,
    error,
  } = useInfiniteScroll(getAllCharacters);

  if (error.errorMessage)
    return (
      <div
        className="mx-auto text-center text-light-100/60 mt-[40px]
          mb-[120px]">
        {error.errorMessage}
      </div>
    );

  return (
    <>
      <h1
        className="mb-6 font-extrabold text-center text-light-300
      text-responsive-title tracking-[.02px]">
        Rick and Morty <br /> Characters
      </h1>
      <nav
        className="relative top-0 z-3 flex flex-wrap
      lg:flex-nowrap justify-center lg:justify-between items-center gap-4
      bg-gray-900 py-4 w-full">
        <Filter />
        <SearchBar />
      </nav>
      <div className="w-full">
        {isLoading && totalCharacters === 0 && (
          <div className="mx-auto text-center text-light-100/60">
            Loading...
          </div>
        )}
        <ul
          className="gap-1 grid grid-cols-2 md:grid-cols-4
        lg:grid-cols-5 xl:grid-cols-6 w-full">
          {characters?.map((character, i) => {
            const isTheLastOne = characters.length - 1 === i;

            if (isTheLastOne) {
              return (
                <li
                  key={character.id}
                  ref={(node) => setLastCharacterFakeRef(node)}>
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
          <div
            className="mx-auto text-center text-light-100/60 mt-[40px]
          mb-[120px]">
            No more
          </div>
        )}
      </div>
    </>
  );
}
