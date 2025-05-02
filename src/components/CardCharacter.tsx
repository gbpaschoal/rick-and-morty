import React from 'react';
import { ICharacter } from '../types/Characters';
import { ButtonFavorite, FavoriteContext } from './Favorites';
import { Overlay } from './Overlay';
import clsx from 'clsx';

export function CardCharacterDetails({
  data: character,
  onClose
}: any) {
  const { isInFavorites, toggleCharactersInFavorites } = React.useContext(FavoriteContext)
  return (
    <Overlay closeModal={onClose}>
      <div className="mt-[4rem] md:mt-[10rem] bg-gray-800 rounded-lg max-w-[16rem] md:max-w-[36rem]
      max-md:block flex gap-x-4 py-4 px-5">
        <div className="w-full flex-1 overflow-hidden rounded-lg mb-3">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="max-w-[300px] flex flex-col p-2">
          <div className="w-full mb-2">
            <h2 className="text-gray-100 font-extrabold
              text-2xl leading-7">
              {character.name}
            </h2>
          </div>
          <div className="w-full flex flex-wrap gap-2 py-2">
            <span
              className="text-base text-gray-100
                  font-medium">
              Status:&nbsp;
              <span
                className="text-base text-white
                    font-semibold">
                {character.status}
              </span>
            </span>
            <span
              className="text-base text-gray-100
                  font-medium">
              Specie:&nbsp;
              <span
                className="text-base text-white
                    font-semibold">
                {character.species}
              </span>
            </span>
            <span
              className="text-base text-gray-100
                  font-medium col-span-2">
              First seen in:&nbsp;
              <span
                className="text-base text-whites
                    font-semibold">
                {character.firstEpisode?.name}
              </span>
            </span>
          </div>
          <button className={clsx('mt-4 md:mt-auto mb-[4px] cursor-pointer rounded-full',
          'p-2 text-center text-base font-semibold',
          isInFavorites(character) ? 'bg-gray-100 text-gray-900' : 'bg-primary text-white'
          )}
          onClick={() => toggleCharactersInFavorites(character)}>
            {isInFavorites(character) ? 'Remove from favorites' : 'Add to favorites'}
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export function CardCharacter({ data }: { data: ICharacter }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {isOpen && <CardCharacterDetails data={data} onClose={() => {
        setIsOpen(false)
      }}/>}
      <div
      onClick={(e) => {if (!e.target.closest('.fav-btn')) setIsOpen(true)}}
      className="group flex flex-col gap-y-2 w-full max-w-[18rem] mx-auto pb-8 bg-gray-900
      rounded-md cursor-pointer">
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="absolute inset-0">
            <div className="flex flex-col justify-start h-full">
              <div className="w-full p-1 relative top-[-100%] group-hover:top-0
              transition-all duration-300">
                <ButtonFavorite data={data} />
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="w-full object-cover" />
        </div>
        <div className="h-16 overflow-hidden p-2">
          <h2
            className="font-extrabold text-gray-100 text-lg md:text-xl w-full md:line-clamp-1">
            {data.name}
          </h2>
          <span className="text-gray-200 text-base">{data.species}</span>
        </div>
      </div>
    </>
  );
}
