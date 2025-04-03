import ButtonFavorite from './ButtonFavorite';
import { ICharacter } from '@/types/Characters';
import React from 'react';
import CardCharacterDetails from './CardCharacterDetails';

export default function CardCharacter({ data }: { data: ICharacter }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = (e) => {
    if (!e.target.closest('.fav-btn')) {
      setIsOpen(true);
    }
  };

  // function addDelayedEffect() {
  //   let timeoutId;

  //   function applyStyles() {
  //     clearTimeout(timeoutId);
  //     overlayRef.current.style.background =
  //       'linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.5) 100%)';
  //     assetsRef.current.style.display = 'block';
  //   }

  //   overlayRef.current.addEventListener('mouseenter', () => {
  //     timeoutId = setTimeout(applyStyles, 400);
  //   });

  //   overlayRef.current.addEventListener('mouseleave', () => {
  //     clearTimeout(timeoutId);
  //     overlayRef.current.style.background = '';
  //     assetsRef.current.style.display = 'none';
  //   });
  // }

  return (
    <>
      {isOpen && (
        <CardCharacterDetails
          data={data}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
      <div className="w-full" onClick={open}>
        <div
          className="group/overlay relative overflow-hidden
        rounded-xl cursor-pointer">
          <div
            className="absolute inset-0 opacity-0 pointer-events-none
            bg-gradient-to-b from-transparent from-[40%] to-gray-950/80
            lg:group-hover/overlay:opacity-100
            lg:group-hover/overlay:pointer-events-auto transition-opacity
            delay-300 ease-linear">
            <div className="flex flex-col justify-between h-full p-2">
              <ButtonFavorite data={data} />
              <div
                className="relative overflow-y-scroll -left-full
                w-full group-hover/overlay:left-0 transition-position
                 delay-500 ease-linear">
                <h2
                  className="text-light-100 font-extrabold
                text-2xl">
                  {data.name}
                </h2>
                <span className="text-base text-light-100">{data.species}</span>
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="object-cover" />
        </div>
      </div>
    </>
  );
}
