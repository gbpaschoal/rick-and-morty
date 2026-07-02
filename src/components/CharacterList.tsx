import { useEffect } from "react";
import { useAutoGrid } from "../hooks/useAutoGrid";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import { CharacterCard } from "./CharacterCard";
import { useInView } from "react-intersection-observer";
import { Spinner } from "./ui/Spinner";

export function CharacterList() {
  const gridRef = useAutoGrid<HTMLUListElement>();
  const { ref, inView } = useInView({
    rootMargin: "200px",
  });
  const { characters, fetchNextPage, isFetchingNextPage } =
    useFetchCharacters();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <ul
        ref={gridRef}
        className="grid place-items-stretch gap-2"
        style={{
          gridTemplateColumns: `repeat(var(--cols), minmax(0, 1fr))`,
        }}
      >
        {characters &&
          characters.map((character) => (
            <li key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
      </ul>
      <div ref={ref} className="flex justify-center">
        <Spinner enabled={isFetchingNextPage} />
      </div>
    </>
  );
}
