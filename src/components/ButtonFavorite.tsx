import React from 'react';
import { clsx } from 'clsx';
import * as Icon from './../assets/icons';
import { FavoriteContext } from './FavoriteProvider';
import { ICharacter } from './../types/Characters';

export default function ButtonFavorite({ data }: { data: ICharacter }) {
  const { isInFavorites, toggleCharactersInFavorites } = React.useContext(FavoriteContext);
  return (
      <button
        onClick={() => toggleCharactersInFavorites(data)}
        className={clsx(
          'fav-btn relative top-0 ml-auto p-3 cursor-pointer rounded-full',
          isInFavorites(data) ? 'bg-red-600' : 'bg-slate-800/60',
          'w-max grid place-items-center backdrop-blur-md'
        )}
        role="button"
        aria-label="Add Character in you list of Favorites">
        <Icon.Fav className="size-8 fill-[var(--light)]" />
      </button>
  );
}
