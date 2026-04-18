import { RiArrowLeftLine as ArrowToLeft } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { useQueries } from "@tanstack/react-query";
import { FavoritesStorage } from "../App";

export function Favorites() {
  const { storage } = FavoritesStorage.useStorage();
  const navigate = useNavigate();

  const fetchCharacter = async (id: number) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    const data = await res.json();
    return data;
  };

  const favCharacters = useQueries({
    queries: storage?.map((id) => ({
      queryKey: ["fav-id", id],
      queryFn: () => fetchCharacter(id),
    })),
  });

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
        {storage.length === 0 && (
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
          {[...favCharacters].reverse().map((character, i) => {
            return (
              <li key={i}>
                <CharacterCard character={character.data} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
