import Header from './components/Header/Header';
import Main from '@/components/Main/Main';
import { FavoritesContextProvider } from './contexts/favorites.context';

export default function App() {
  return (
    <div
      className="[*:where(&>*)]:mx-auto [*:where(&>*)]:px-4
    [*:where(&>*)]:py-3 [*:where(&>*)]:xl:px-6 [*:where(&>*)]:xl:py-4
    bg-gray-900">
      <FavoritesContextProvider>
        <Header />
        <Main />
      </FavoritesContextProvider>
    </div>
  );
}
