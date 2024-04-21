import React from 'react';
import { ICharacter } from '@/types/Characters';

const SearchCardCharacter = React.lazy(() => import('./SearchCardCharacter'));

export default function SearchResults({ results }: { results: ICharacter[] }) {
  return (
    <div>
      <div className="py-2">
        <ul
          className="h-[300px] overflow-y-scroll flex flex-col
           gap-y-2 p-2 *:w-full *:flex *:justify-center">
          <React.Suspense
            fallback={
              <div className="text-sm text-light-100 font-bold text-center">
                Loading...
              </div>
            }>
            {results &&
              results.map((data: ICharacter) => (
                <SearchCardCharacter key={data.id} data={data} />
              ))}
          </React.Suspense>
        </ul>
      </div>
    </div>
  );
}
