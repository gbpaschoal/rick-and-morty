import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import type { Character, CharacterResponse } from "../types/Characters";

type EpisodeInfo = Pick<Character["firstEpisode"], "name" | "episode">;
export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const { data, isFetching, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }): Promise<CharacterResponse> => {
      const { data } = await axios.get<CharacterResponse>(
        `${pageParam}&${params}`,
      );

      await Promise.all(
        data.results.map(async (res) => {
          const { data: firstEpisode } = await axios.get<EpisodeInfo>(
            res.episode[0],
          );
          Object.assign(res, {
            firstEpisode: {
              name: firstEpisode.name,
              episode: firstEpisode.episode,
            },
          });
        }),
      );

      await new Promise((res) => setTimeout(res, 500));

      return data;
    },
    initialPageParam: import.meta.env.VITE_BASE_URL,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next;
    },
  });

  return { data, isFetching, isError, fetchNextPage };
};
