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
        className="bg-gray-800 rounded-lg max-w-[38rem]
        grid sm:grid-cols-[1fr_,300px] gap-4 py-4 px-5">
        <div className="w-full overflow-hidden rounded-lg mb-3">
          <img src={character.image} alt={character.name} />
        </div>
        <div className="flex flex-col gap-y-2 p-2">
          <div className="w-full mb-2">
            <h2 className="text-gray-100 font-extrabold
              text-2xl leading-7">
              {character.name}
            </h2>
          </div>
          <div className="w-full flex flex-wrap gap-4">
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
          <div className='mt-auto mb-[4px] cursor-pointer rounded-full p-2 text-center text-base font-semibold
          bg-primary text-white'>Add to Favorites</div>
        </div>
      </div>
    </OverlayModal>
  );
}
