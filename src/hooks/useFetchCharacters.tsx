import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import type { CharactersResponse, Episode } from "../types";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();
  const API_URL = import.meta.env.VITE_BASE_URL as string;

  const fetchCharacters = async (
    pageUrl: string,
  ): Promise<CharactersResponse> => {
    //try-catch
    const { data: characters } = await axios.get<CharactersResponse>(
      `${pageUrl}&${params}`,
    );

    const fetchEpisode = async (episodeUrl: string) => {
      const { data: episode } = await axios.get<Episode>(episodeUrl);

      return episode;
    };

    if (characters.results) {
      await Promise.all(
        characters?.results?.map(async (res) => {
          const firstEpisode = await fetchEpisode(res.episode[0]);
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
  };

  const { data, isFetching, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: ({ pageParam }) => fetchCharacters(pageParam),
    initialPageParam: API_URL,
    getNextPageParam: (lastPage) => (lastPage.info ? lastPage.info.next : null),
  });

  return { data, isFetching, isError, fetchNextPage };
};
