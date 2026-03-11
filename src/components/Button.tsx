import clsx from "clsx";
import { useFavoriteStore } from "../store/favoritesStore";
import { Character } from "../types/interfaces";
import { Fav } from "../assets/icons";

export function FavoriteButton({ character }: { character: Character | undefined }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavoriteStore();

  return (
    <button
      onClick={() => character && toggleCharacterInFavorites(character)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        character && isFavorite(character) ? "bg-red-600" : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      aria-label="Add Character to Favorites"
    >
      <Fav className="size-6 fill-gray-100 sm:size-8" />
    </button>
  );
}