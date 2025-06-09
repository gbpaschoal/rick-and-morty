import React from "react";
import { ICharacter } from "../types/Characters";
import { ButtonFavorite, FavoriteContext } from "./Favorites";

export function CardCharacter({ data }: { data: ICharacter }) {
  return (
    <article
      className="group flex w-full h-full rounded-md bg-gray-900 sm:max-w-[18rem]
        sm:flex-col md:pb-4"
    >
      <div className="relative inset-0 flex-shrink-0 overflow-hidden max-sm:max-w-[200px] max-sm:rounded-md
       max-sm:rounded-r-none sm:rounded-t-md
      ">
        <div className="absolute inset-0">
          <div className="flex h-full flex-col justify-start">
            <div
              className="relative -top-full w-full p-1 transition-all
            duration-300 group-hover:top-0"
            >
              <ButtonFavorite data={data} />
            </div>
          </div>
        </div>
        <img
          src={data.image}
          alt={data.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="overflow-hidden p-2">
        <h2 className="text-lg font-bold text-gray-100 md:text-xl ">
          {data.name}
        </h2>
        <span className="block pb-3 text-gray-200">{data.species}</span>
        <span className="text-base text-gray-400">
          First seen in:&nbsp;
          <span className="font-semibold text-gray-200">
            {data.firstEpisode?.name}
          </span>
        </span>
      </div>
    </article>
  );
}
