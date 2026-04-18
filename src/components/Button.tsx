import clsx from "clsx";
import { Character } from "../types/interfaces";
import { useFavorites } from "../hooks/useFavorites";
import { RiHeartFill as FavIcon } from "@remixicon/react";

export function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavorites();

  return (
    <button
      onClick={() => toggleCharacterInFavorites(character.id)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        character && isFavorite(character.id)
          ? "bg-red-600"
          : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      aria-label="Add Character to Favorites"
    >
      <FavIcon size={20} className="fill-gray-100 sm:size-8" />
    </button>
  );
}
