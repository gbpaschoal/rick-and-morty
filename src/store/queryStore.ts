import { create } from "zustand";

export const useQueryStore = create((set) => ({
  query: "",
  setQuery: (newQuery: string) => set({ query: newQuery }),
}));
