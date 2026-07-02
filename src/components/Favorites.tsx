import { motion } from "motion/react";
import clsx from "clsx";
import { ArrowToLeft, FavIconFill } from "./ui/icons";
import { useFavoritesStore } from "../store/favorites";
import { useAutoGrid } from "../hooks/useAutoGrid";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router";
import { CharacterCard } from "./CharacterCard";
import type { Character } from "../types";

export function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavoritesStore();
  return (
    <motion.button
      onClick={() => toggleCharacterInFavorites(character)}
      className={clsx(
        "cursor-pointer rounded-full p-3 backdrop-blur-md",
        character && isFavorite(character) ? "bg-red-600" : "bg-slate-800/60",
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.98 }}
      onHoverEnd={() => ({
        scale: 1,
      })}
      aria-label="Add Character to Favorites"
    >
      <FavIconFill className="fill-gray-100 sm:size-7" />
    </motion.button>
  );
}

export function Favorites() {
  const { favorites } = useFavoritesStore();
  const navigate = useNavigate();
  const gridRef = useAutoGrid<HTMLUListElement>();

  return (
    <div className="flex-y-2">
      <div className="flex justify-center">
        <div className="max-w-xl w-full py-8 flex-y-2 sm:grid sm:grid-cols-[auto_1fr_3.5rem] items-center">
          <Button as="button" onClick={() => navigate(-1)} variant="secondary">
            <ArrowToLeft className="size-6 sm:size-8" />
          </Button>
          <h1
            className="text-gray-100 text-center text-[clamp(2.25rem,10vw,3.75rem)]
          leading-[0.8] font-bold"
          >
            Favorites
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {favorites.length === 0 && (
          <div className="mx-auto text-center">
            <span className="font-medium text-gray-400">
              There is nothing yet
            </span>
          </div>
        )}
        <ul
          ref={gridRef}
          className="grid place-items-stretch gap-2 w-full max-w-xl"
          style={{
            gridTemplateColumns: `repeat(var(--cols), minmax(0, 1fr))`,
          }}
        >
          {[...favorites].reverse().map((character) => {
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
          })}
        </ul>
      </div>
    </div>
  );
}
