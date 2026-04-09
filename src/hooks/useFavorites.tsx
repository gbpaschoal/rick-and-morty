import { FavoritesStorage } from "../App";

export const useFavorites = () => {
  const { storage, setStorage } = FavoritesStorage.useStorage();
  const isFavorite = (id: number) => {
    const arr = storage.includes(id);

    return arr;
  };
  const toggleCharacterInFavorites = (characterId: number) => {
    if (isFavorite(characterId)) {
      const arr = storage.filter(id => id !== characterId);
      localStorage.setItem("favorites", JSON.stringify(arr));
      setStorage(arr);

      return;
    }

    const arr = [...storage, characterId];
    localStorage.setItem("favorites", JSON.stringify(arr));
    setStorage(arr);

  };
  return { isFavorite, toggleCharacterInFavorites };
};