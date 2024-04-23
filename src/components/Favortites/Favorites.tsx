import React from 'react';
import * as Icon from '@/assets/icons';
import CardCharacter from '@/components/CardCharacter/CardCharacter';
import { useFavorites } from '@/contexts/favorites.context';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="w-full sm:grid sm:grid-cols-3 place-items-center mb-8
      sm:mb-16
      ">
        <button
          onClick={() => navigate(-1)}
          className="motion-opacity p-3 bg-gray-700 hover:bg-gray-600
        rounded-full justify-self-start">
          <Icon.ArrowToLeft className="size-8" />
        </button>
        <h2
          className="font-extrabold
        text-center text-[clamp(2rem,_7vw,_3.6rem)] leading-none
         text-light-300 tracking-[.02px]
        mt-6 sm:mt-0">
          Favorites
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center">
        {Object.entries(favorites).length === 0 && (
          <div className="mx-auto text-center">
            <span className="text-light-100/60 "> There is nothing yet </span>
          </div>
        )}
        <ul
          className="gap-1 grid grid-cols-2 sm:grid-cols-3
        md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full">
          {[...favorites].reverse().map((character) => {
            return (
              <li key={character.id}>
                <CardCharacter data={character} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
