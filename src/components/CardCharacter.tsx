import React from "react";
import { Character } from "../types/Characters";
import { ButtonFavorite } from "./Favorites";

export function CardCharacter({ character }: { character: Character }) {
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
              <ButtonFavorite character={character} />
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
