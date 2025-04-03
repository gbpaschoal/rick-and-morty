import * as React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { ICharacter } from './types/Characters';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type TFavoriteContext = {
  favorites: ICharacter[];
  setFavorites: React.Dispatch<React.SetStateAction<ICharacter[]>>;
};

export const FavoriteContext = React.createContext<TFavoriteContext>({
  favorites: [],
  setFavorites: () => {},
});

function FavoriteContextProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<ICharacter[]>([]);

  console.log(favorites);
  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}
export default function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteContextProvider>
          <Header />
          <Main />
        </FavoriteContextProvider>
      </QueryClientProvider>
    </>
  );
}
