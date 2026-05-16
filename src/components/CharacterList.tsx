import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { CharacterCard } from "./CharacterCard";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";

export function CharacterList() {
  const { characters, isFetching, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });

  return (
    <ul
      className="grid place-items-stretch gap-2 sm:max-w-384 grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 lg:min-w-294"
    >
      {characters &&
        characters.map((character, i) => {
          const isTheLastOne = characters.length - 1 === i;
          return (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={character?.id}
              ref={isTheLastOne ? observer : null}
            >
              <CharacterCard character={character!} />
            </motion.li>
          );
        })}
    </ul>
  );
}
