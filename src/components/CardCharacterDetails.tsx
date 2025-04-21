import React from 'react';
import OverlayModal from './OverlayModal';
import { ICharacter } from './../types/Characters';

type CardCharacterModalProps = {
  data: ICharacter;
  isOpen: boolean;
  onClose: () => void;
};

export default function CardCharacterDetails({
  isOpen,
  onClose,
  data: character,
}: CardCharacterModalProps) {
  return (
    <OverlayModal isOpen={isOpen} onClose={onClose}>
      <div
        className="mt-[20vh] bg-gray-800 rounded-lg w-[50vw] min-w-[250px] max-w-[600px]
        grid grid-cols-[1fr_,300px] items-start gap-x-4 py-4 px-5">
        <div
          className="relative top-0 overflow-hidden rounded-lg
          mb-3">
          {/* <div className="absolute bg-green-600 top-0 w-full z-1 p-2">
            <ButtonFavorite data={character} />
          </div> */}
          <img src={character.image} alt={character.name} />
        </div>
        <div className="flex flex-col h-full gap-y-2 p-2">
          <div className="w-full mb-2">
            <h2 className="text-gray-100 font-extrabold
              text-2xl leading-7">
              {character.name}
            </h2>
          </div>
          <div className="w-full grid grid-cols-2 grid-rows-2">
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
                {character.firstEpisode?.episode} / {character.firstEpisode?.name}
              </span>
            </span>
          </div>
          <div className='mt-auto mb-[4px] cursor-pointer rounded-full py-1 text-center text-base font-semibold
          bg-primary text-white'>Add to Favorites</div>
        </div>
      </div>
    </OverlayModal>
  );
}
