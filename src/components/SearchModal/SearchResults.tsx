// import React from 'react';
import SearchCardCharacter from './SearchCardCharacter';
import { ICharacter } from './../../types/Characters';

export default function SearchResults({ results }: { results: ICharacter[] }) {
  return (
    <ul
      className="w-full h-[300px] overflow-y-scroll flex flex-col
           gap-y-2 p-2 *:w-full *:flex *:justify-center">
      {results &&
        results.map((data: ICharacter) => (
          <SearchCardCharacter key={data.id} data={data} />
        ))}
    </ul>
  );
}
