import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { CharacterCard } from "./CharacterCard";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { useAutoGrid } from "../hooks/useAutoGrid";

export function CharacterList() {
  const { characters, isFetching, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(() => {
    if (!isFetching) {
      fetchNextPage();
    }
  });
  const gridRef = useAutoGrid<HTMLUListElement>();

  return (
    <ul
      ref={gridRef}
      className="grid place-items-stretch gap-2"
      style={{
        gridTemplateColumns: `repeat(var(--cols), minmax(0, 1fr))`,
      }}
    >
      {characters &&
        characters.map((character, i) => {
          const isTheLastOne = characters.length - 1 === i;
          return (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: "linear",
              }}
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
