import React from 'react';
import * as Icon from '../assets/icons';
import CardCharacter from './CardCharacter';
import { FavoriteContext} from './FavoriteProvider';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { favorites } = React.useContext(FavoriteContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='w-full'>
      <div
        className="w-full sm:grid sm:grid-cols-3 place-items-center mb-8
      sm:mb-16
      ">
        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white hover:bg-gray-900
          group transition-colors ease-linear
          *:transition-colors *:ease-linear
          rounded-full justify-self-start">
          <Icon.ArrowToLeft className="size-8 fill-black
          group-hover:fill-gray-200"/>
        </button>
        <h2
          className="font-extrabold
        text-center text-[clamp(2rem,_7vw,_3.6rem)] leading-none
         text-gray-100 tracking-tight
        mt-6 sm:mt-0">
          Favorites
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center">
        {favorites.length === 0 && (
          <div className="mx-auto text-center">
            <span className="text-gray-200 "> There is nothing yet </span>
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
    </div>
  );
}
