import React from 'react';
import { getAllCharacters } from '@/services/rick-and-morty.api';
import { ICharacter } from '@/types/Characters';

const SearchCardCharacter = React.lazy(() => import('./SearchCardCharacter'));

export default function SearchResults({ q }: { q: string }) {
  const [charactersList, setCharactersList] = React.useState<ICharacter[]>([]);
  const deferredQuery = React.useDeferredValue<typeof q>(q);

  const fetchCharactersByQuery = async (q: string): Promise<void> => {
    if (q.trim() === '') {
      setCharactersList([]);
      return;
    }

    try {
      const { results } = await getAllCharacters(`?name=${q}`);
      if (results)
        results.forEach((character) => {
          fetch(character.episode[0])
            .then((res) => res.json())
            .then((res) => {
              character.firstEpisode = res.name;
            });
        });
      setCharactersList(results);
      // console.log(charactersList);
    } catch (error) {
      console.log('Ocurred an error: ', error);
      setCharactersList([]);
    }
  };

  React.useEffect(() => {
    fetchCharactersByQuery(deferredQuery);
  }, [deferredQuery]);

  return (
    <div className="">
      <div className="py-2">
        <ul
          className="h-[300px] overflow-y-scroll flex flex-col
           gap-y-2 p-2 *:w-full *:flex *:justify-center">
          <React.Suspense>
            {charactersList &&
              charactersList.map((data: ICharacter) => (
                <SearchCardCharacter key={data.id} data={data} />
              ))}
          </React.Suspense>
        </ul>
      </div>
    </div>
  );
}
