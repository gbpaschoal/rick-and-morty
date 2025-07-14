import { Icon } from "../assets/icons/Icon";
import { Link, useNavigate } from "react-router-dom";
import { GridContainer } from "./GridContainer";
import { CardCharacter } from "./CardCharacter";
import { useWidth } from "../hooks/useWidth";
import { useFavoriteStore } from "../store/favoritesStore";

export function Favorites() {
  const { favorites } = useFavoriteStore();
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
            <span className="font-medium text-gray-400">
              There is nothing yet
            </span>
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

export function ButtonFavorite() {
  const width = useWidth();

  return (
    <Link
      to="fav"
      className="inline-grid flex-shrink-0 cursor-pointer place-items-center
        rounded-4xl bg-primary text-white max-sm:size-12
        sm:px-4 sm:py-3"
      aria-label="Favorites"
    >
      {width < 448 ? <Icon.Fav className="size-6 fill-white" /> : "Favorites"}
    </Link>
  );
}
