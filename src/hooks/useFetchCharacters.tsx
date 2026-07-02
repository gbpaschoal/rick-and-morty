import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getCharactersWithFirstEpisode } from "../api";
import { API_URL } from "../api";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const query = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }) => {
      console.log(`page param: ${pageParam}`);
      return getCharactersWithFirstEpisode(`${pageParam}&${params}`);
    },
    initialPageParam: API_URL,
    // staleTime: 1000 * 60 * 30,
    getNextPageParam: (lastPage) => (lastPage.info ? lastPage.info.next : null),
  });

  // PRECISA DO USEMEMO?
  const characters = query.data?.pages.flatMap((page) => page.results);

  return { characters, ...query };
};
