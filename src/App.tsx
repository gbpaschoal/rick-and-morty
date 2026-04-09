import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";
import { createStorageContext } from "./hooks/useLocalStorage";

export const FavoritesStorage = createStorageContext<number>("favorites");

export default function App() {
  return (
    <div className="px-2">
      <Header />
      <div className="my-16">
        <FavoritesStorage.Provider>
          <ScrollRestoration />
          <Outlet />
        </FavoritesStorage.Provider>
      </div>
      <NavFooter />
    </div>
  );
}
