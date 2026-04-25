import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { Link } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Spinner } from "./Spinner";
import { SearchBar } from "./SearchBar";
import { motion } from "framer-motion";
import { Filter } from "./Filter";
import { RiHeartLine as FavIcon } from "@remixicon/react";

export function Home() {
  const { data, isFetching, isError, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(fetchNextPage);
  const characterList = data?.pages.flatMap((page) => page.results);

  return (
    <>
      <div className="flex-y items-center gap-y-4">
        <h1
          className="text-gray-100 text-center text-[clamp(2.25rem,10vw,3.75rem)]
          leading-[0.8] font-bold"
        >
          Rick and Morty <br /> Characters
        </h1>
        <div className="w-full max-w-lg">
          <SearchBar />
        </div>
        <Link
          to={"/favorites"}
          className="flex items-center gap-x-2 px-4 py-2 bg-gray-900
          hover:bg-gray-800 transition-all
          text-gray-100 rounded-4xl cursor-pointer"
        >
          <FavIcon className="size-5 fill-gray-100" />
          Favorites
        </Link>
      </div>

      <div className="flex-y">
        <div>
          <div className="w-full py-2">
            <Filter />
          </div>
          <ul
            className="grid place-items-stretch gap-2 sm:max-w-384 grid-cols-2 md:grid-cols-3
            lg:grid-cols-4"
          >
            {characterList &&
              characterList.map((character, i) => {
                const isTheLastOne = characterList.length - 1 === i;
                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={character?.id}
                    ref={isTheLastOne ? observer : null}
                  >
                    <CharacterCard character={character} />
                  </motion.li>
                );
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
