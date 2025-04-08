import * as React from 'react'

import { ICharacter } from '../types/Characters';


export const FavoriteContext = React.createContext<{
  favorites: ICharacter[];
  setFavorites: (fav: ICharacter) => void
}>({
  favorites: [],
  setFavorites: () => {}
});

export default function FavoriteProvider({
  children
}: {
   children: React.ReactNode
  }) {
  const [favorites, setFavorites] = React.useState<ICharacter[]>([]);

  const favoriteState = React.useMemo(() => ({
    favorites, setFavorites
  }), favorites)

  return (
    //@ts-ignore
    <FavoriteContext.Provider value={favoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
}