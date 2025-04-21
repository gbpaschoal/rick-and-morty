import { SearchBar } from './Search'
import Characters from './Characters'

export default function Hero() {
  return (
    <div className='flex flex-col gap-y-6 items-center'>
      <div className="w-full flex flex-col gap-y-4 items-center mb-4 px-2">
        <h1 className="font-extrabold text-center text-gray-100
          text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-none
          tracking-tight">
          Rick and Morty <br /> Characters
        </h1>
        <SearchBar/>
      </div>
      <Characters/>
    </div>
  )
}
