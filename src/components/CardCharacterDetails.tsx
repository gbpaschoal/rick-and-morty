// import React from 'react';
import clsx from 'clsx';
import ButtonFavorite from './ButtonFavorite';
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
        className="mt-[15vh] bg-gray-700 rounded-[10px] w-[50vw] min-w-[250px] max-w-[300px]
          h-auto flex flex-col items-center py-4 px-5">
        <div
          className="relative top-0 overflow-hidden rounded-[10px] h-auto
          mb-3">
          <div className="absolute top-0 w-full z-1 p-2">
            <ButtonFavorite data={character} />
          </div>
          <img src={character.image} alt={character.name} />
        </div>
        <div className="w-full">
          <div className="w-full flex flex-wrap gap-2 justify-between items-center mb-2">
            <h2
              className="inline-block text-light-100 font-extrabold
                text-2xl leading-[28px]">
              {character.name}
            </h2>
            <span
              className={clsx(
                'text-sm text-light-100 font-semibold backdrop-blur-md px-3 py-1 rounded-full border-2',
                character.status === 'Alive'
                  ? 'border-primary-100/80'
                  : character.status === 'Dead'
                    ? 'border-red/80'
                    : 'border-gray-200/80'
              )}>
              {character.status}
            </span>
          </div>
          <span
            className="text-base text-light-100/80
                font-medium">
            {character.species}
          </span>
          <br />
          <span
            className="text-base text-light-100/80
                font-medium">
            First seen in:&nbsp;
            <span
              className="text-base text-light-100
                  font-semibold">
              {character.firstEpisode}
            </span>
          </span>
        </div>
      </div>
    </OverlayModal>
  );
}
