import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { Link } from "react-router-dom";
import { CardCharacter } from "./CardCharacter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Filter } from "./Filter";
import { Spinner } from "./Spinner";
import { SearchBar } from "./SearchBar";
import { ButtonFavorite } from "./Favorites";
import { motion } from "framer-motion";

export function Home() {
  const { data, isFetching, isError, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(fetchNextPage);
  const characterList = data?.pages.flatMap((page) => page.results);

  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="w-full flex flex-col items-center gap-y-4">
        <Link to="/" aria-label="Clear Filters">
          <h1
            className="text-center text-[2.2rem] font-bold leading-none
              tracking-tight text-gray-100 sm:text-[3rem]
              lg:text-[3.5rem]"
          >
            Rick and Morty <br /> Characters
          </h1>
        </Link>
        <div className="flex w-full max-w-xl items-center justify-center gap-2">
          <SearchBar />
          <ButtonFavorite />
        </div>
      </div>
      <Filter />
      {isError && (
        <span className="font-medium text-gray-400">
          {"No founds :("}
        </span>
      )}
      <ul className="grid place-items-stretch gap-2 sm:max-w-[96rem] grid-cols-2 md:grid-cols-3
      lg:grid-cols-4"
      >
        {characterList &&
          characterList.map((character, i) => {
            const isTheLastOne = characterList.length - 1 === i;
            return (
              <motion.li
                initial = {{ opacity: 0 }}
                animate = {{ opacity: 1 }}
                key={character.id}
                ref={isTheLastOne ? observer : null}
              >
                <CardCharacter character={character} />
              </motion.li>
            );
          })}
      </ul>
      {isFetching && (
        <div className="inline-block py-4">
          <Spinner enabled={isFetching}/>
        </div>
      )}
    </div>
  );
}
