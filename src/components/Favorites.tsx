import * as React from 'react'

import { ICharacter } from '../types/Characters';

export const FavoriteContext = React.createContext<{
  favorites: ICharacter[];
  updateFavorites: (fav: ICharacter) => void
}>({
  favorites: [],
  updateFavorites: () => {}
});

export default function FavoriteProvider({
  children
}: {
   children: React.ReactNode
  }) {
  const [favorites, setFavorites] = React.useState<ICharacter[]>([]);

  const updateFavorites = (fav: ICharacter) => {
    setFavorites(prev => [...prev, fav])
  }
  const favoriteState = React.useMemo(() => ({
    favorites, updateFavorites
  }), favorites)
  return (
    <FavoriteContext.Provider value={favoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
}