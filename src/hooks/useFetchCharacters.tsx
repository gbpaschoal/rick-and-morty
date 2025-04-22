import React from "react"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import axios from "axios"

export const useFetchCharacters = () => {
  const BASE_URL = 'https://rickandmortyapi.com/api/character/?page=1'
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
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['characters', params],
    queryFn: ({ pageParam }) => func(pageParam),
    initialPageParam: BASE_URL,
    getNextPageParam: (lastPage) => {
      return lastPage.info.next
    }
  })

return { data, fetchNextPage}
}