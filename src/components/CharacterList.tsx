import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { CharacterCard } from "./CharacterCard";
import { motion } from "framer-motion";
import { useAutoGrid } from "../hooks/useAutoGrid";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { Spinner } from "./ui/Spinner";

export function CharacterList() {
  const {
    characters,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchCharacters();
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });
  const gridRef = useAutoGrid<HTMLUListElement>();

  const requestedRef = useRef(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !requestedRef.current) {
      requestedRef.current = true;

      fetchNextPage().finally(() => {
        requestedRef.current = false;
      });
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  //API FALLS IN EVERY PAGE LOAD

  return (
    <>
      {/* BUG: REF LOSE ELEMENT */}
      <ul
        ref={gridRef}
        className="grid place-items-stretch gap-2"
        style={{
          gridTemplateColumns: `repeat(var(--cols), minmax(0, 1fr))`,
        }}
      >
        {characters &&
          characters.map((character) => {
            if (character) {
              return (
                <motion.li
                  key={character.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.75,
                  }}
                >
                  <CharacterCard character={character} />
                </motion.li>
              );
            }
          })}
      </ul>
      <div ref={ref} className="flex-x justify-center">
        <Spinner enabled={isFetching} />
      </div>
    </>
  );
}
