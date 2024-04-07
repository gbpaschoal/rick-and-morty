// Hooks
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// Types
import { ICharacter, IResultList } from '@/types/Characters';
import { BadRequest } from '@/pages/characters/errors';

export function useInfiniteScroll(
  cb: (url: string, signal?: AbortSignal) => Promise<IResultList>
) {
  const [results, setResults] = useState<ICharacter[]>([]);
  const [page, setPage] = useState<number>(2);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCharacterFakeRef, setLastCharacterFakeRef] =
    useState<Element | null>(null);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState({});

  const controllerRef = useRef<AbortController | null>(null);

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

      data.results.forEach((character) => {
        fetch(character.episode[0])
          .then((res) => res.json())
          .then((res) => {
            character.firstEpisode = res.name;
          });
      });

      setResults((prev) => [...prev, ...data.results]);
      setTotalCharacters(data.info.count);
      setPage((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoading) {
            fetchNewPage();
          }
        });
      },
      { rootMargin: '200px' }
    );

    if (lastCharacterFakeRef) {
      observer.observe(lastCharacterFakeRef);
    }

    return () => {
      if (lastCharacterFakeRef) {
        observer.unobserve(lastCharacterFakeRef);
      }
    };
  }, [lastCharacterFakeRef]);

  useEffect(() => {
    setIsLoading(true);
    setResults([]);
    setPage(2);

    let timeId: ReturnType<typeof setTimeout>;

    const controller = new AbortController();
    controllerRef.current = controller;

    cb(`?page=1&${searchParams.toString()}`, controller.signal)
      .then((data) => {
        if (data.results)
          data.results.forEach((character) => {
            fetch(character.episode[0])
              .then((res) => res.json())
              .then((res) => {
                character.firstEpisode = res.name;
              });
          });
        timeId = setTimeout(() => {
          setResults((prev) => [...prev, ...data.results]);
          setTotalCharacters(data.info.count);
          setIsLoading(false);
        }, 200);

        // const badRequest = new BadRequest();
        // setError((prev) => ({
        //   ...prev,
        //   errorMessage: badRequest.message,
        // }));
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
    setLastCharacterFakeRef,
    isLoading,
    totalCharacters,
    error,
  };
}
