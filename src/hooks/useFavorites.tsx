import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type React from "react";

export const FavoritesContext = createContext<{
  store: number[],
  setStore: (arr: number[]) => void
}>({ store: [], setStore: (arr: number[]) => { } });

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<number[]>([]);

  useEffect(() => {
    setStore(JSON.parse(localStorage.getItem("favorites") || "[]"));
  }, []);

  const favoritesValue = useMemo(() => {
    return { store, setStore };
  }, [store]);

  return (
    <FavoritesContext.Provider value={favoritesValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
export const useFavorites = () => {
  const storeContext = useContext(FavoritesContext);
  return (storeContext);
};
