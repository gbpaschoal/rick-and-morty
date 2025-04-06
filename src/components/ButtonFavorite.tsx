import React from 'react';
import { clsx } from 'clsx';
import * as Icon from './../assets/icons';
import { FavoriteContext } from './Favorites';
import { ICharacter } from './../types/Characters';

export default function ButtonFavorite({ data }: { data: ICharacter }) {
  const { favorites, updateFavorites } = React.useContext(FavoriteContext);
  const isInFavorites = favorites.some((elem) => elem.id === data.id);

  const addToFavorites = () => {
    if (isInFavorites) {
      // updateFavorites(favorites.filter((elem) => elem.id !== data.id));
      console.log('oi')
      return;
    }
    updateFavorites(data);
  };
  return (
    <button
      onClick={addToFavorites}
      className={clsx(
        'fav-btn relative top-[-10%] group-hover/overlay:top-0 cursor-pointer ml-auto p-3 rounded-full',
        isInFavorites ? 'bg-red' : 'bg-gray-400 hover:bg-gray-300',
        'w-max grid place-items-center backdrop-blur-md box-shadow transition-opacity'
      )}
      role="button"
      aria-label="Add Character in you list of Favorites">
      <Icon.Fav className="size-8 fill-light-200" />
    </button>
  );
}
