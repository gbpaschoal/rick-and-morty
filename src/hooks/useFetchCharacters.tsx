import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getCharactersByURL, getEpisodeByURL } from "../api/characters";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();
  const API_URL = import.meta.env.VITE_BASE_URL as string;

  const { data, isFetching, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }) => {
      const characters = getCharactersByURL(`${pageParam}&${params}`);

      if (characters.results) {
        await Promise.all(
          characters?.results?.map(async (res) => {
            const firstEpisode = await getEpisodeByURL(res.episode[0]);
            Object.assign(res, {
              firstEpisode: {
                name: firstEpisode.name,
                episode: firstEpisode.episode,
              },
            });
          }),
        );
      }

      return characters;
    },
    initialPageParam: API_URL,
    getNextPageParam: (lastPage) => (lastPage.info ? lastPage.info.next : null),
  });

  return { data, isFetching, isError, fetchNextPage };
};
