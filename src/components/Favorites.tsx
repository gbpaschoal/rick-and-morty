import React from "react";
import { Icon } from "../assets/icons/Icon";
import { useNavigate } from "react-router-dom";
import GridContainer from "./GridContainer";
import { clsx } from "clsx";
import { ICharacter } from "./../types/Characters";

export const FavoriteContext = React.createContext<{
  favorites: ICharacter[];
  isInFavorites: (character: ICharacter) => boolean;
  toggleCharactersInFavorites: (character: ICharacter) => void;
}>({
  favorites: [],
  isInFavorites: () => false,
  toggleCharactersInFavorites: () => {},
});

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<ICharacter[]>([]);
  const isInFavorites = React.useCallback(
    (character: ICharacter) =>
      favorites.some((elem) => elem.id === character.id),
    [favorites],
  );

  const toggleCharactersInFavorites = React.useCallback(
    (character: ICharacter) => {
      if (isInFavorites(character)) {
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
      isInFavorites,
      toggleCharactersInFavorites,
    }),
    [favorites],
  );

  return (
    //@ts-ignore
    <FavoriteContext.Provider value={favoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default function Favorites() {
  const { favorites } = React.useContext(FavoriteContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid w-full place-items-center">
      <div
        className="mb-8 w-full max-w-6xl place-items-center sm:mb-16
      sm:grid sm:grid-cols-3
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
            className="size-8 fill-black
          group-hover:fill-gray-200"
          />
        </button>
        <h1
          className="mt-6 text-[2.2rem] font-extrabold
          tracking-tight text-gray-100 sm:mt-0 sm:text-[3rem] lg:text-[3.5rem]"
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
        <GridContainer
          data={[...favorites].reverse()}
          state={{ isLoading: false, isError: false }}
          fetchMore={() => {}}
        />
      </div>
    </div>
  );
}

export function ButtonFavorite({ data }: { data: ICharacter }) {
  const { isInFavorites, toggleCharactersInFavorites } =
    React.useContext(FavoriteContext);
  return (
    <button
      onClick={() => toggleCharactersInFavorites(data)}
      className={clsx(
        "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
        isInFavorites(data) ? "bg-red-600" : "bg-slate-800/60",
        "grid w-max place-items-center backdrop-blur-md",
      )}
      role="button"
      aria-label="Add Character in you list of Favorites"
    >
      <Icon.Fav className="size-8 fill-gray-100" />
    </button>
  );
}
