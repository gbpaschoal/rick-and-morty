import React from 'react';
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite';
import CardCharacterDetails from '../ModalCharacter/CardCharacterDetails';

export default function SearchCardCharacter({ data }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = (e) => {
    if (!e.target.closest('.fav-btn')) {
      setIsOpen(true);
    }
  };

  const onClose = (e: React.MouseEvent<Element>) => {
    e.preventDefault();
    setIsOpen(false);
  };
  return (
    <li>
      {isOpen && (
        <CardCharacterDetails data={data} isOpen={isOpen} onClose={onClose} />
      )}
      <div
        onClick={open}
        className="w-full bg-gray-700 rounded-[10px] flex
       p-2 items-center">
        <div className="flex-1 flex gap-x-2">
          <div className="w-full max-w-20 flex-shrink-0 rounded-[10px] overflow-hidden">
            <img className="w-full h-auto" src={data.image} alt={data.name} />
          </div>
          <div className="flex flex-col justify-center overflow-auto">
            <span
              className="text-xl leading-none font-bold text-light-100
             hyphens-auto break-words">
              {data.name}
            </span>
            <span className="text-base text-light-100/60">{data.species}</span>
          </div>
        </div>
        <div>
          <ButtonFavorite data={data} />
        </div>
      </div>
    </li>
  );
}
