import * as React from 'react'

import { ICharacter } from '../types/Characters';


export const FavoriteContext = React.createContext<{
  favorites: ICharacter[];
  isInFavorites: (character: ICharacter) => boolean;
  toggleCharactersInFavorites: (character: ICharacter) => void
}>({
  favorites: [],
  isInFavorites: () => false,
  toggleCharactersInFavorites: () => {}
});

export default function FavoriteProvider({
  children
}: {
   children: React.ReactNode
  }) {
  const [favorites, setFavorites] = React.useState<ICharacter[]>([]);
  const isInFavorites = React.useCallback((character: ICharacter) => favorites.some(
    (elem) => elem.id === character.id
  ), [favorites]);

  const toggleCharactersInFavorites = React.useCallback((character: ICharacter) => {
    if (isInFavorites(character)) {
      setFavorites(prev => prev.filter((elem) => elem.id !== character.id))
      return
    }

    setFavorites(prev => [...prev, character])
  }, [favorites])

  const favoriteState = React.useMemo(() => ({
    favorites, isInFavorites, toggleCharactersInFavorites
  }), [favorites])

  return (
    //@ts-ignore
    <FavoriteContext.Provider value={favoriteState}>
      {children}
    </FavoriteContext.Provider>
  );
}