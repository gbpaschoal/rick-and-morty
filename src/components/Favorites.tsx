import { RiArrowLeftLine as ArrowToLeft } from "@remixicon/react";
import { RiHeartFill as FavIcon } from "@remixicon/react";

import { useNavigate } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { useFavoritesStore } from "../store/favorites";
import clsx from "clsx";
import { Character } from "../types";
import { useAutoGrid } from "../hooks/useAutoGrid";
import { motion } from "framer-motion";

export function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavoritesStore();

  return (
    <motion.button
      onClick={() => toggleCharacterInFavorites(character)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3 grid place-items-center",
        character && isFavorite(character) ? "bg-red-600" : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.98 }}
      onHoverEnd={() => ({
        scale: 1,
      })}
      aria-label="Add Character to Favorites"
    >
      <FavIcon className="fill-gray-100 sm:size-7" />
    </motion.button>
  );
}

export function Favorites() {
  const { favorites } = useFavoritesStore();
  const navigate = useNavigate();
  const gridRef = useAutoGrid<HTMLUListElement>();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-center">
        <div className="max-w-xl w-full py-8 flex flex-col gap-y-2 sm:grid sm:grid-cols-[auto_1fr_3.5rem] items-center">
          <button
            onClick={() => navigate(-1)}
            className="group grid size-14 place-items-center cursor-pointer rounded-full
          bg-gray-100 p-3 transition-all hover:bg-gray-900"
          >
            <ArrowToLeft
              className="size-6 fill-black group-hover:fill-gray-200 transition-all
          sm:size-8"
            />
          </button>
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
          {[...favorites].reverse().map((character, i) => {
            return (
              <li key={i}>
                <CharacterCard character={character} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
