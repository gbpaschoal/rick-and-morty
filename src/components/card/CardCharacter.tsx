import { MouseEvent, useState } from 'react';
import ButtonFavorite from './ButtonFavorite';
import CardCharacterModal from './CardCharacterModal';
import { TCharacter } from '@/types/Characters';

export default function CardCharacter({ data }: { data: TCharacter }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closeModal = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    const closestElement = targetElement.closest('.character-modal');
    !closestElement && setIsOpen(false);
  };

  return (
    <>
      <CardCharacterModal
        isModalCharacterOpen={isOpen}
        characterInModal={data}
        closeModal={closeModal}
      />
      <div
        onClick={(e) => {
          const targetElement = e.target as HTMLElement;
          if (targetElement.closest('.fav-btn')) return;
          setIsOpen(true);
        }}
        className="w-full card-character">
        <div
          className="group/overlay relative overflow-hidden
        rounded-[10px] grid place-items-center">
          <div
            className="absolute inset-0 z-10 opacity-0 invisible
        bg-gradient-to-b from-[transparent] from-[36%] to-gray-950/80 to-[98%]
        motion-opacity lg:group-hover/overlay:opacity-100 lg:group-hover/overlay:visible">
            <div className="flex flex-col justify-between h-full p-2">
              <ButtonFavorite data={data} />
              <div
                className="relative overflow-y-scroll left-[-100%] bottom-0 w-full invisible
            opacity-0 motion-opacity group-hover/overlay:opacity-100
            group-hover/overlay:visible group-hover/overlay:left-0">
                <h2
                  className="text-light-100 font-extrabold
                text-extra-large tracking-[.02px]">
                  {data.name}
                </h2>
                <span
                  className="text-[1rem] text-light-100
                font-small">
                  {data.species}
                </span>
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="object-cover" />
        </div>
      </div>
    </>
  );
}
