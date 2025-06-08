import React from "react";
import { ICharacter } from "../types/Characters";
import { ButtonFavorite, FavoriteContext } from "./Favorites";
import { Overlay } from "./Overlay";
import clsx from "clsx";

export function CardCharacterDetails({ data: character, onClose }: any) {
  const { isInFavorites, toggleCharactersInFavorites } =
    React.useContext(FavoriteContext);
  return (
    <Overlay closeModal={onClose}>
      <div
        className="mt-[4rem] flex max-w-[16rem] gap-x-4 rounded-lg bg-gray-800
      px-5 py-4 max-md:block md:mt-[10rem] md:max-w-[36rem]"
      >
        <div className="mb-3 w-full flex-1 overflow-hidden rounded-lg">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="flex max-w-[300px] flex-col p-2">
          <div className="mb-2 w-full">
            <h2
              className="text-2xl font-bold
              leading-7 text-gray-100"
            >
              {character.name}
            </h2>
          </div>
          <div className="flex w-full flex-wrap gap-2 py-2">
            <span
              className="text-base font-medium
                  text-gray-200"
            >
              Status:&nbsp;
              <span
                className="text-base font-semibold
                    text-white"
              >
                {character.status}
              </span>
            </span>
            <span
              className="text-base font-medium
                  text-gray-100"
            >
              Specie:&nbsp;
              <span
                className="text-base font-semibold
                    text-white"
              >
                {character.species}
              </span>
            </span>
            <span
              className="col-span-2 text-base
                  font-medium text-gray-100"
            >
              First seen in:&nbsp;
              <span
                className="text-whites text-base
                    font-semibold"
              >
                {character.firstEpisode?.name}
              </span>
            </span>
          </div>
          <button
            className={clsx(
              "mb-[4px] mt-4 cursor-pointer rounded-full md:mt-auto",
              "p-2 text-center text-base font-semibold",
              isInFavorites(character)
                ? "bg-gray-100 text-gray-900"
                : "bg-primary text-white",
            )}
            onClick={() => toggleCharactersInFavorites(character)}
          >
            {isInFavorites(character)
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export function CardCharacter({ data }: { data: ICharacter }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {isOpen && (
        <CardCharacterDetails
          data={data}
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}
      <div
        onClick={(e) => {
          if (!e.target.closest(".fav-btn")) setIsOpen(true);
        }}
        className="group mx-auto flex w-full max-w-[18rem] cursor-pointer flex-col gap-y-2 rounded-md
      bg-gray-900 pb-6"
      >
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0">
            <div className="flex h-full flex-col justify-start">
              <div
                className="relative top-[-100%] w-full p-1 transition-all
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
        <div className="h-auto overflow-hidden p-2">
          <h2 className="w-full text-lg font-bold text-gray-100 md:text-xl ">
            {data.name}
          </h2>
          <span className="text-base text-gray-200">{data.species}</span>
        </div>
      </div>
      {/* <div className="group flex flex-col w-full max-w-[18rem] mx-auto bg-gray-900
      rounded-md cursor-pointer">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <div className="flex flex-col justify-start h-full">
              <div className="w-full p-1 relative top-[-100%] group-hover:top-0
              transition-all duration-300">
                <ButtonFavorite data={data} />
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="w-full aspect-square object-cover" />
        </div>
        <div className="h-auto overflow-hidden py-2">
          <h2
            className="font-semibold text-gray-100 text-lg w-full ">
            {data.name}
          </h2>
          <span className="text-gray-200 text-base">{data.species}</span>

          {/* <div className="mx-auto w-[280px] py-2 bg-gray-900 text-white text-center text-lg font-semibold rounded-lg">
            Details
          </div>
        </div>
      </div> */}
    </>
  );
}
