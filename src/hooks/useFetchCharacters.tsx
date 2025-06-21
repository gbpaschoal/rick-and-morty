import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString();

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery({
    queryKey: ["characters", params],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get(`${pageParam}&${params}`);

      await Promise.all(
        data.results.map(async (res) => {
          const { data: firstEpisode } = await axios.get(res.episode[0]);
          Object.assign(res, {
            firstEpisode: {
              name: firstEpisode.name,
              episode: firstEpisode.episode,
            },
          });
        }),
      );

      return data;
    },
    initialPageParam: import.meta.env.VITE_BASE_URL,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next;
    },
  });

  return { data, isLoading, isError, fetchNextPage };
};
