import CardCharacter from './CardCharacter';
import { useFetchCharacters } from '../hooks/useFetchCharacters';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import React from 'react';

export function GridContainer({ data, setObserver }: {data: any, setObserver?:any}) {
  return (
    <ul
      className="grid-container">
      {data?.map((group, i) => (
        <React.Fragment key={i}>
          {group?.results.map((character, index) => {
            const isTheLastOne = group.results.length - 1 === index;
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
          )})}
        </React.Fragment>
      ))}
    </ul>
  )
}


export default function Characters () {
  const {data, fetchNextPage} = useFetchCharacters()
  const setObserver = useIntersectionObserver(fetchNextPage)
  return (
      <>
        <GridContainer data={data?.pages} setObserver={setObserver}/>
      </>
  );

}



