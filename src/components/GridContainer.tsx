import CardCharacter from './CardCharacter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import React from 'react';

export default function GridContainer({ data, fetchMore }: {data: any, fetchMore?: any}) {
  const setObserver = useIntersectionObserver(fetchMore)

  return (
    <ul className="w-full max-w-[96rem] grid gap-2 xs:grid-cols-2
    sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data?.map((character, idx) => {
        const isTheLastOne = data.length - 1 === idx;
            if (isTheLastOne) {
              return (
                <li key={character.id} ref={setObserver}>
                  <CardCharacter data={character} />
                </li>
              )};
            return (
              <li key={character.id}>
                <CardCharacter data={character} />
              </li>
            )
    })}
    </ul>
  )
}



