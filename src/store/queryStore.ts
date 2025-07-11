import { create } from "zustand";

type QueryState = {
  query: string,
  setQuery: (query: string) => void
}

export const useQueryStore = create<QueryState>((set) => ({
  query: "",
  setQuery: (newQuery: string) => set({ query: newQuery }),
}));
