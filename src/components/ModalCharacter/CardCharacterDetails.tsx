import React from 'react';
import Icon from '@/assets/icons';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import OverlayModal from '../OverlayModal';
import { ICharacter } from '@/types/Characters';

type CardCharacterModalProps = {
  data: ICharacter;
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
};

export default function CardCharacterDetails({
  isOpen,
  onClose,
  data: character,
}: CardCharacterModalProps) {
  React.useEffect(() => {
    const isAlreadyOpen = document.body.style.overflowY === 'hidden';

    if (!isAlreadyOpen) document.body.style.overflowY = 'hidden';

    return () => {
      if (!isAlreadyOpen) {
        document.body.style.overflowY = '';
      }
    };
  }, [isOpen]);
  return (
    <OverlayModal>
      <div
        onClick={onClose}
        className="absolute -z-1 backdrop-blur-2xl w-full h-screen"
        aria-expanded={isOpen}>
        <div>
          <button
            className="ml-auto grid
        place-items-center z-3 p-4">
            <Icon.Close />
          </button>
        </div>
      </div>
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
                text-[1.75rem] leading-[28px]">
              {character.name}
            </h2>
            <span
              className={`text-[.8rem] text-light-100
                font-semibold  backdrop-blur-[50px] px-3 py-1 rounded-full
                border-2 ${
                  character.status === 'Alive'
                    ? 'border-primary-100/80'
                    : character.status === 'Dead'
                      ? 'border-red/80'
                      : 'border-gray-200/80'
                } `}>
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
            {`First seen in:
            ${(
              <span
                className="text-base text-light-100
                  font-semibold">
                {character.firstEpisode}
              </span>
            )}
            `}
          </span>
        </div>
      </div>
    </OverlayModal>
    // <div
    //   onClick={onClose}
    //   className="fixed z-5 inset-0 backdrop-blur-md grid
    //         place-items-center bg-gray-950/20">
    // </div>
  );
}
