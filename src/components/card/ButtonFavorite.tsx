import { FavSVG } from '@/assets/icons/main/FavSVG';
import { useFavorites } from '@/contexts/favorites.context';

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
       ml-auto w-max p-3 rounded-full
    ${
      isInFavorites ? 'bg-red' : 'bg-gray-300/80'
    } grid place-items-center motion-transform
      backdrop-blur-[50px] box-shadow`}>
      <FavSVG className="fill-light-100 size-8" />
    </div>
  );
}
