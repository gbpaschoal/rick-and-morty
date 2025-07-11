import { create } from "zustand";
import { Character } from "../types/Characters";

type FavoriteStore = {
  favorites: Character[];
  isFavorite: (character: Character) => boolean;
  toggleCharacterInFavorites: (character: Character) => void;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
  isFavorite: (character) => {
    const { favorites } = get();
    return favorites.some((elem) => elem.id === character.id);
  },
  toggleCharacterInFavorites: (character: Character) => {
    const { favorites, isFavorite } = get();
    if (isFavorite(character)) {
      set({ favorites: favorites.filter((elem) => elem.id !== character.id) });
      return;
    }

    set({ favorites: [...favorites, character] });
  },
}));