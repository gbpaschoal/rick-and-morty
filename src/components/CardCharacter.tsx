import React from "react";
import { Character } from "../types/Characters";
import { Icon } from "../assets/icons/Icon";
import clsx from "clsx";
import { useFavoriteStore } from "../store/favoritesStore";

export function CardCharacter({ character }: { character: Character }) {
  const { isFavorite, toggleCharacterInFavorites } = useFavoriteStore();
  return (
    <div
      className="group flex h-full w-full max-w-[18rem] flex-col rounded-md
        bg-gray-900 pb-4"
    >
      <div className="relative inset-0 overflow-hidden rounded-t-md">
        <div className="absolute inset-0">
          <div className="flex h-full flex-col justify-start">
            <div
              className="relative top-0 w-full p-1 transition-all duration-300
            lg:-top-full lg:group-hover:top-0"
            >
              <button
                onClick={() => toggleCharacterInFavorites(character)}
                className={clsx(
                  "fav-btn relative top-0 ml-auto cursor-pointer rounded-full p-3",
                  isFavorite(character)
                    ? "bg-red-600"
                    : "bg-slate-800/60",
                  "grid w-max place-items-center backdrop-blur-md",
                )}
                aria-label="Add Character to Favorites"
              >
                <Icon.Fav className="size-6 fill-gray-100 sm:size-8" />
              </button>
            </div>
          </div>
        </div>
        <img
          src={character.image}
          alt={character.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="overflow-hidden p-2">
        <h2 className="text-lg font-semibold text-gray-100 md:text-xl ">
          {character.name}
        </h2>
        <span className="block pb-3 text-gray-200">{character.species}</span>
        <span className="text-gray-400">
          First seen in:&nbsp;
          <span className="font-semibold text-gray-200">
            {character.firstEpisode.name}
          </span>
        </span>
      </div>
    </div>
  );
}
