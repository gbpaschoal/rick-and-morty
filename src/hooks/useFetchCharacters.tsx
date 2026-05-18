import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCharactersWithFirstEpisode } from "../api/characters";
import { useMemo } from "react";
import { API_URL } from "../api/characters";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const query = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }) =>
      getCharactersWithFirstEpisode(`${pageParam}&${params}`),
    initialPageParam: API_URL,
    getNextPageParam: (lastPage) => (lastPage.info ? lastPage.info.next : null),
  });

  const characters = useMemo(
    () => query.data?.pages.flatMap((page) => page.results),
    [query.data],
  );

  return { characters, ...query };
};
