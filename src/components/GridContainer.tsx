import CardCharacter from './CardCharacter';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import React from 'react';

export default function GridContainer({ data, fetchMore }: {data: any, fetchMore?: any}) {
  const setObserver = useIntersectionObserver(fetchMore)

  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2
    sm:max-w-[96rem]">
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



