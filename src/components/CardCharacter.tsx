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
      <div className="group mx-auto xs:w-full max-w-[18.75rem] bg-gray-900 rounded-xl flex flex-col gap-y-2
      pb-8 p-2 hover:bg-gray-800"
      onClick={(e) => {
        if (!e.target.closest('.fav-btn')) {
          setIsOpen(true);
    }
      }}>
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0">
            <div className="flex flex-col justify-start h-full">
              <div className="w-full p-1 relative top-[-100%] group-hover:top-0
              transition-all duration-300">
                <ButtonFavorite data={data} />
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="object-cover" />
        </div>
        <div className="h-14 overflow-hidden">
          <h2
            className="font-extrabold text-gray-100 text-lg md:text-xl w-full md:line-clamp-1">
            {data.name}
          </h2>
          <span className="text-[var(--gray-200)] text-base">{data.species}</span>
        </div>
      </div>
    </>
  );
}
