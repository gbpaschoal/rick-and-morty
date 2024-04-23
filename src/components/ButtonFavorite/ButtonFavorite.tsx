import { useFavorites } from '@/contexts/favorites.context';
import * as Icon from '@/assets/icons';

export default function ButtonFavorite({ data }) {
  const { favorites, setFavorites } = useFavorites();

  const isInFavorites = favorites.some((elem) => elem.id === data.id);

  const addToFavorites = () => {
    if (isInFavorites) {
      setFavorites(favorites.filter((elem) => elem.id !== data.id));
      return;
    }

    setFavorites((prev) => [...prev, data]);
  };
  return (
    <div
      onClick={() => addToFavorites()}
      className={`fav-btn relative top-[-10%] group-hover/overlay:top-0 cursor-pointer
       ml-auto p-3 rounded-full
    ${
      isInFavorites ? 'bg-red' : 'bg-gray-500'
    } w-max grid place-items-center motion-transform
      backdrop-blur-[50px] box-shadow `}
      role="button"
      aria-label="Add Character in you list of Favorites">
      <Icon.Fav className="size-8" />
    </div>
  );
}
