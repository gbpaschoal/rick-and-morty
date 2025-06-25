import React from "react";
import { Icon } from "../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import { GridContainer } from "./GridContainer";
import { clsx } from "clsx";
import { Character } from "./../types/Characters";
import { CardCharacter } from "./CardCharacter";

export const FavoriteContext = React.createContext<{
  favorites: Character[];
  verifyCharacterInFavorites: (character: Character) => boolean;
  toggleCharacterInFavorites: (character: Character) => void;
}>({
  favorites: [],
  verifyCharacterInFavorites: () => false,
  toggleCharacterInFavorites: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<Character[]>([]);
  const verifyCharacterInFavorites = React.useCallback(
    (character: Character) =>
      favorites.some((elem) => elem.id === character.id),
    [favorites],
  );

  const toggleCharacterInFavorites = React.useCallback(
    (character: Character) => {
      if (verifyCharacterInFavorites(character)) {
        setFavorites((prev) => prev.filter((elem) => elem.id !== character.id));
        return;
      }

      setFavorites((prev) => [...prev, character]);
    },
    [favorites],
  );

  const favoriteState = React.useMemo(
    () => ({
      favorites,
      verifyCharacterInFavorites,
      toggleCharacterInFavorites,
    }),
    [favorites],
  );

  return (
    <FavoriteContext.Provider value={favoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
}

const useFavoriteContext = () => {
  const { favorites } = React.useContext(FavoriteContext);
  return { favorites };
};

export function Favorites() {
  const { favorites } = useFavoriteContext();
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
          className="group justify-self-start rounded-full
          bg-white p-3 transition-colors
          ease-linear *:transition-colors
          *:ease-linear hover:bg-gray-900"
        >
          <Icon.ArrowToLeft
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
            <span className="text-gray-200 "> There is nothing yet </span>
          </div>
        )}
        <GridContainer>
          {[...favorites].reverse().map((character) => {
            return (
              <li key={character.id}>
                <CardCharacter character={character} />
              </li>
            );
          })}
        </GridContainer>
      </div>
    </div>
  );
}

export function ButtonFavorite({ character }: { character: Character }) {
  const { verifyCharacterInFavorites, toggleCharacterInFavorites } =
    React.useContext(FavoriteContext);
  return (
    <button
      onClick={() => toggleCharacterInFavorites(character)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        verifyCharacterInFavorites(character)
          ? "bg-red-600"
          : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      role="button"
      aria-label="Add Character in you list of Favorites"
    >
      <Icon.Fav className="size-6 fill-gray-100 sm:size-8" />
    </button>
  );
}
