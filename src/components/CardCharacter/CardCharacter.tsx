import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import { ICharacter } from '@/types/Characters';
import React from 'react';
import CardCharacterDetails from '../ModalCharacter/CardCharacterDetails';

export default function CardCharacter({ data }: { data: ICharacter }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = (e) => {
    if (!e.target.closest('.fav-btn')) {
      setIsOpen(true);
    }
  };

  const onClose = (e) => {
    if (!e.target.closest('.character-modal')) {
      setIsOpen(false);
    }
  };
  return (
    <>
      {isOpen && <CardCharacterDetails data={data} onClose={onClose} />}
      <div className="w-full" onClick={open}>
        {/* {isOpen && <div className="text-light-100">Oi</div>} */}
        <div
          className="group/overlay relative overflow-hidden
        rounded-xl">
          <div
            className="absolute inset-0 opacity-0 pointer-events-none
            bg-gradient-to-b from-transparent from-[40%] to-gray-950/80
            lg:group-hover/overlay:opacity-100
            lg:group-hover/overlay:pointer-events-auto transition-opacity
            delay-200 ease-linear">
            <div className="flex flex-col justify-between h-full p-2">
              <ButtonFavorite data={data} />
              <div
                className="relative overflow-y-scroll -left-full
                w-full group-hover/overlay:left-0 transition-position
                duration-100 delay-100 ease-linear">
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
