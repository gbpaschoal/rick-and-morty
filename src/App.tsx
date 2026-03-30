import { Header } from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { NavFooter } from "./components/NavFooter";
import { FavoritesProvider } from "./hooks/useFavorites";

export default function App() {
  return (
    <div className="px-2">
      <Header />
      <div className="my-16">
        <FavoritesProvider>
          <ScrollRestoration />
          <Outlet />
        </FavoritesProvider>
      </div>
      <NavFooter />
    </div>
  );
}
