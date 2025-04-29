import React from 'react';
import { ICharacter } from '../types/Characters';
import ButtonFavorite from './ButtonFavorite';
import { CardCharacterDetails } from './CardCharacterDetails';

export default function CardCharacter({ data }: { data: ICharacter }) {
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
