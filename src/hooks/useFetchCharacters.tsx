import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCharactersWithFirstEpisode } from "../api/characters";
import { useMemo } from "react";
import { API_URL } from "../api/characters";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const { data, isFetching, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }) =>
      getCharactersWithFirstEpisode(`${pageParam}&${params}`),
    initialPageParam: API_URL,
    getNextPageParam: (lastPage) => (lastPage.info ? lastPage.info.next : null),
  });

  const characters = useMemo(
    () => data?.pages.flatMap((page) => page.results),
    [data],
  );

  return { characters, isFetching, isError, fetchNextPage };
};
