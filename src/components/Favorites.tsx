import { RiArrowLeftLine as ArrowToLeft } from "@remixicon/react";
import { RiHeartFill as FavIcon } from "@remixicon/react";

import { useNavigate } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { useFavoritesStore } from "../store/favorites";
import clsx from "clsx";
import { Character } from "../types";

export function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavoritesStore();

  return (
    <button
      onClick={() => toggleCharacterInFavorites(character)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        character && isFavorite(character) ? "bg-red-600" : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      aria-label="Add Character to Favorites"
    >
      <FavIcon size={20} className="fill-gray-100 sm:size-8" />
    </button>
  );
}

export function Favorites() {
  const { favorites } = useFavoritesStore();
  const navigate = useNavigate();

  return (
    <div className="grid w-full place-items-center">
      <div
        className="mb-8 grid w-full max-w-6xl
      grid-cols-3 place-items-center
      "
      >
        <button
          onClick={() => navigate(-1)}
          className="group cursor-pointer justify-self-start rounded-full
          bg-white p-3 transition-colors
          ease-linear *:transition-colors
          *:ease-linear hover:bg-gray-900"
        >
          <ArrowToLeft
            className="size-6 fill-black group-hover:fill-gray-200
          sm:size-8"
          />
        </button>
        <h1
          className="text-[2.2rem] font-bold tracking-tight text-gray-100
          sm:text-[3rem] lg:text-[3.5rem]"
        >
          Favorites
        </h1>
      </div>
      <div className="flex w-full flex-col items-center">
        {favorites.length === 0 && (
          <div className="mx-auto text-center">
            <span className="font-medium text-gray-400">
              There is nothing yet
            </span>
          </div>
        )}
        <ul
          className="grid place-items-stretch gap-2 sm:max-w-384 grid-cols-2 md:grid-cols-3
      lg:grid-cols-4"
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
