import Header from './components/header/Header';
import Main from '@/components/main/Main';
import { FavoritesContextProvider } from './contexts/favorites.context';

export default function App() {
  return (
    <div>
      <Header />
      <FavoritesContextProvider>
        <Main />
      </FavoritesContextProvider>
    </div>
  );
}
