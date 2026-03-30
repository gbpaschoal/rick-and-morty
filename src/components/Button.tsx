import clsx from "clsx";
import { Character } from "../types/interfaces";
import { Fav } from "../assets/icons";
import { useFavorites } from "../hooks/useFavorites";

const useFavorite = () => {
  const { store, setStore } = useFavorites();
  const isFavorite = (id: number) => {
    const arr = store.includes(id);

    return arr;
  };
  const toggleCharacterInFavorites = (characterId: number) => {
    if (isFavorite(characterId)) {
      const arr = store.filter(id => id !== characterId);
      localStorage.setItem("favorites", JSON.stringify(arr));
      setStore(arr);

      return;
    }

    const arr = [...store, characterId];
    localStorage.setItem("favorites", JSON.stringify(arr));
    setStore(arr);

  };
  return { isFavorite, toggleCharacterInFavorites };
};

export function FavoriteButton({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavorite();

  return (
    <button
      onClick={() => toggleCharacterInFavorites(character.id)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        character && isFavorite(character.id) ? "bg-red-600" : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      aria-label="Add Character to Favorites"
    >
      <Fav className="size-6 fill-gray-100 sm:size-8" />
    </button>
  );
}