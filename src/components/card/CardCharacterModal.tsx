import CloseSVG from '@/assets/icons/main/CloseSVG';
import ButtonFavorite from './ButtonFavorite';
import { TCharacter } from '@/types/Characters';
import { MouseEvent } from 'react';

type CardCharacterModalProps = {
  isModalCharacterOpen: boolean;
  characterInModal: TCharacter;
  closeModal: (e: MouseEvent) => void;
};

export default function CardCharacterModal({
  isModalCharacterOpen,
  characterInModal,
  closeModal,
}: CardCharacterModalProps) {
  if (!isModalCharacterOpen) return null;

  return (
    <div
      onClick={(e: MouseEvent): void => closeModal(e)}
      className={
        isModalCharacterOpen
          ? `fixed z-3 inset-0 backdrop-blur-[50px] grid
            place-items-center character-modal-bg`
          : 'hidden'
      }>
      <button
        className="absolute top-0 right-0 grid
        place-items-center z-3 p-4">
        <CloseSVG className="fill-light-100 size-12" />
      </button>
      <div
        className="character-modal bg-gray-700 rounded-[10px] max-w-[300px]
          h-auto flex flex-col items-center py-4 px-5">
        <div
          className="relative top-0 overflow-hidden rounded-[10px] h-auto
          mb-3">
          <div className="absolute top-0 w-full z-1 p-2">
            <ButtonFavorite data={characterInModal} />
          </div>
          <img src={characterInModal.image} alt={characterInModal.name} />
        </div>
        <div className="w-full">
          <div className="w-full flex flex-wrap gap-2 justify-between items-center mb-2">
            <h2
              className="inline-block text-light-100 font-extrabold
                text-[1.75rem] leading-[28px]">
              {characterInModal.name}
            </h2>
            <span
              className={`text-[.8rem] text-light-100
                font-semibold  backdrop-blur-[50px] px-3 py-1 rounded-full
                border-2 ${
                  characterInModal.status === 'Alive'
                    ? 'border-primary-100/80'
                    : characterInModal.status === 'Dead'
                      ? 'border-red/80'
                      : 'border-gray-200/80'
                } `}>
              {characterInModal.status}
            </span>
          </div>
          <span
            className="text-[1rem] text-light-100/80
                font-medium">
            {characterInModal.species}
          </span>
          <br />
          <span
            className="text-[1rem] text-light-100/80
                font-medium">
            First seen in: {''}
            <span
              className="text-[1rem] text-light-100
                font-semibold">
              {characterInModal.firstEpisode}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
