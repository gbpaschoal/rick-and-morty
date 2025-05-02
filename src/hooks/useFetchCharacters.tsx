import React from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export const useFetchCharacters = () => {
  const [searchParams] = useSearchParams();
  const params = searchParams.toString()

  const func = async (page: any) => {
      const { data } = await axios.get(`${page}&${params}`)

      await Promise.all(
        data.results.map(async (el) => {
          const { data: firstEpisode } = await axios.get(el.episode[0]);
          Object.assign(el, {
            firstEpisode: {
              name: firstEpisode.name,
              episode: firstEpisode.episode,
            }
          });
        })
      );


      return data
    }

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters', params],
    queryFn: ({ pageParam }) => func(pageParam),
    initialPageParam: import.meta.env.VITE_BASE_URL,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next
    }
  })

  const state = React.useMemo(()=>({isLoading, isError}),[isLoading, isError])

return { data, state, fetchNextPage }
}