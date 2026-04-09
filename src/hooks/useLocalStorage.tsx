import { createContext, useContext, useEffect, useState } from "react";
import type React from "react";

function useLocalStorage<T>(key: string, initialValue: T[] | null) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function createStorageContext<T>(key: string) {
  const Context = createContext<{
    storage: T[], setStorage: (a: T[]) => void
  }>({ storage: [], setStorage: (a) => { } });

  function Provider({ children }: { children: React.ReactNode }) {
    const [storage, setStorage] = useLocalStorage(key, null);

    return (
      <Context.Provider value={{ storage, setStorage }}>
        {children}
      </Context.Provider>
    );
  }

  function useStorage() {
    return useContext(Context);
  }

  return { Provider, useStorage };
}

