import { GridContainer } from './Characters'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function SearchResults() {
  const BASE_URL = 'https://rickandmortyapi.com/api/character/'
  const params = useParams()
   const { data } = useQuery({queryKey: ['character'], queryFn: async () => {
    const { data } = await axios.get(`${BASE_URL}?name=${params.id}`)
    return data.results
  }})
  console.log(data)
  return (
    <div>
      <div className='py-3 w-full'>
        <h1 className='text-3xl block w-max mx-auto'>
          "<span className='font-bold'>{params.id}</span>"
          </h1>
      </div>
      <GridContainer data={data}/>
    </div>
  )
}
