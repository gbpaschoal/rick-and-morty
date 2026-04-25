import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";
import { createStorageContext } from "./hooks/useLocalStorage";

export const FavoritesStorage = createStorageContext<number>("favorites");

export function App() {
  return (
    <div className="relative">
      <Header />
      <main className="my-16 px-2">
        <FavoritesStorage.Provider>
          <ScrollRestoration />
          <Outlet />
        </FavoritesStorage.Provider>
      </main>
      <NavFooter />
    </div>
  );
}
