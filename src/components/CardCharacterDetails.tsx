import React from 'react';
import { SearchModalOverlay } from './Search';
import { ICharacter } from './../types/Characters';
import { Overlay } from './Overlay';
import { FavoriteContext } from './FavoriteProvider';
import clsx from 'clsx';

type CardCharacterModalProps = {
  data: ICharacter;

};

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
