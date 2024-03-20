import { useFavorites } from '@/contexts/favorites.context';
import CardCharacter from '@/components/card/CardCharacter';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowToLeft } from '@/assets/icons/main/ArrowToLeft';

function ThereIsNothingHere() {
  return (
    <div className="mx-auto text-center">
      <h1 className="text-light-100/60 "> There is nothing here </h1>
    </div>
  );
}

export default function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className="w-full md:grid md:grid-cols-3 place-items-center mb-8
      md:mb-16
      ">
        <button
          onClick={() => navigate(-1)}
          className="motion-opacity p-3 bg-gray-700 hover:bg-gray-600
        rounded-full justify-self-start">
          <ArrowToLeft className="fill-light-100 size-8" />
        </button>
        <h2
          className="font-extrabold
        text-center text-responsive-title text-light-300 tracking-[.02px]
        mt-6 md:mt-0">
          Favorites
        </h2>
      </div>
      <div className="w-full flex flex-col justify-center">
        {Object.entries(favorites).length === 0 && <ThereIsNothingHere />}
        <ul
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5
    xl:grid-cols-6 gap-1 w-full">
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
