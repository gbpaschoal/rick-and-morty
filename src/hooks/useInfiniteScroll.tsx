import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ICharacter, IResultList } from '@/types/Characters';
import _ from 'lodash';

export function useInfiniteScroll(
  cb: (url: string, signal?: AbortSignal) => Promise<IResultList>
) {
  const [results, setResults] = React.useState<ICharacter[]>([]);
  const [page, setPage] = React.useState(2);
  const [totalCharacters, setTotalCharacters] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [observerRef, setObserverRef] = React.useState<Element | null>(null);
  const [searchParams] = useSearchParams();
  const controllerRef = React.useRef<AbortController | null>(null);

  const fetchNewPage = async () => {
    if (isLoading) return;

    controllerRef.current && controllerRef.current.abort();

    setIsLoading(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const data = await cb(
        `?page=${page}&${searchParams.toString()}`,
        controller.signal
      );

      if (data) {
        setResults((prev) => _.uniqBy([...prev, ...data.results], 'id'));
        setTotalCharacters(data.info.count);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      }
    } catch (error) {
      console.log('');
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          let retries = 0;
          while (retries <= 3) {
            try {
              setIsLoading(true);
              await fetchNewPage();
              setIsLoading(false);

              break;
            } catch (error) {
              console.log('tentando novamente', retries);
              retries++;
            }
          }
        }
      },
      { rootMargin: '200px' }
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [observerRef]);

  React.useEffect(() => {
    controllerRef.current && controllerRef.current.abort();

    setIsLoading(true);
    setResults([]);
    setPage(2);

    let timeId: ReturnType<typeof setTimeout>;

    const controller = new AbortController();
    controllerRef.current = controller;

    cb(`?page=1&${searchParams.toString()}`, controller.signal)
      .then((data) => {
        if (data) {
          timeId = setTimeout(() => {
            setResults((prev) => [...prev, ...data.results]);
            setTotalCharacters(data.info.count);
            setIsLoading(false);
          }, 200);
        }
      })
      .catch((error) => console.log(error));

    window.scrollTo(0, 0);

    return () => {
      controller.abort();
      clearTimeout(timeId);
    };
  }, [searchParams]);

  return {
    results,
    setObserverRef,
    isLoading,
    totalCharacters,
  };
}
