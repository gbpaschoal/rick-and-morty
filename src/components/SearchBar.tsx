import { SearchSVG } from '@/assets/icons/main/SearchSVG';
import {
  Suspense,
  lazy,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getOneCharacter } from '@/services/api';
import ButtonFavorite from '@/components/card/ButtonFavorite';
import { ICharacter } from '@/types/Characters';

const CardCharacterModal = lazy(
  () => import('@/components/card/CardCharacterModal')
);

function CardCharactersSearchBar({ data }: { data: ICharacter }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (e: React.MouseEvent<Element>) => {
    const targetElement = e.target as HTMLElement;
    const closestElement = targetElement.closest('.character-modal');
    !closestElement && setIsOpen(false);
  };

  return (
    <li>
      <CardCharacterModal
        isModalCharacterOpen={isOpen}
        characterInModal={data}
        closeModal={closeModal}
      />
      <div
        onClick={(e) => {
          const targetElement = e.target as HTMLElement;
          if (targetElement.closest('.fav-btn')) return;
          setIsOpen(true);
        }}
        className="w-full max-w-[98%] rounded-[10px] bg-gray-500
          hover:bg-gray-400
      flex items-center p-2 motion-opacity">
        <div className="flex flex-1 gap-x-4">
          <div
            className="w-[5.5rem] rounded-[10px] overflow-hidden
          ">
            <img src={data.image} alt={data.name} />
          </div>
          <div className="flex flex-col justify-center">
            <h4 className="text-large text-light-100 font-semibold">
              {data.name}
            </h4>
            <span className="text-medium text-light-100/60 font-regular">
              {data.species}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <ButtonFavorite data={data} />
        </div>
      </div>
    </li>
  );
}

export default function SearchBar() {
  const [searchCharacters, setSearchCharacters] = useState([]);
  const [query, setQuery] = useState<string>('');
  const deferredQuery = useDeferredValue<typeof query>(query);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const fetchCharactersByQuery = async (deferredQuery: string) => {
    const { results, error } = await getOneCharacter(`?name=${deferredQuery}`);
    if (error) {
      isOpen && setIsOpen(false);
      return;
    }

    setSearchCharacters(results);
  };

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;

    if (inputText.trim() === '') {
      isOpen && setIsOpen(false);

      throw new Error('Digite algo');
    }

    setQuery(inputText);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchCharactersByQuery(deferredQuery);
  }, [deferredQuery]);

  useEffect(() => {
    const handleModal = (e: React.MouseEvent<HTMLElement>): void => {
      console.log(e.target);
      if (
        !e.target.closest('.search-modal') &&
        !e.target.closest('.character-modal-bg') &&
        e.target !== inputRef.current
      ) {
        if (inputRef.current) inputRef.current.value = '';
        setIsOpen(false);

        return;
      }
    };

    document.addEventListener('click', handleModal);

    return () => document.removeEventListener('click', handleModal);
  }, []);

  return (
    <div
      className="relative z-3 w-full
     sm:max-w-[80%] lg:max-w-[40%] order-1 lg:order-2">
      {isOpen && (
        <div
          className="search-modal absolute flex flex-col gap-y-1
        top-full my-1 rounded-[10px] min-h-16 max-h-[400px] w-full
        bg-gray-700
        pb-2">
          <ul
            className="overflow-y-scroll w-full flex flex-col
           gap-y-2 p-2 *:w-full *:flex *:justify-center ">
            {searchCharacters &&
              searchCharacters.map((data: ICharacter) => (
                <Suspense>
                  <CardCharactersSearchBar key={data.id} data={data} />
                </Suspense>
              ))}
          </ul>
        </div>
      )}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center justify-center
         px-4 bg-gray-700 backdrop-blur-[10px] motion-linear rounded-[10px]
         w-full focus:bg-gray-600 hover:bg-gray-600">
        <button className="mr-2">
          <SearchSVG className={'mt-[4px] w-[1.55em] fill-light-100/60'} />
        </button>
        <input
          onChange={handleQuery}
          ref={inputRef}
          type="text"
          placeholder="Search Characters"
          className="outline-none border-none bg-[transparent] flex-1
        text-light-100 placeholder:text-light-300/60 h-12"
        />
      </form>
    </div>
  );
}
