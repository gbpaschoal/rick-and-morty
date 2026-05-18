import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Filter } from "./Filter";
import { FavIcon } from "./ui/Icon";
import { CharacterList } from "./CharacterList";

export function Home() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex-y gap-y-4">
        <Link
          to="/"
          className="text-gray-100 text-center text-[clamp(2.25rem,10vw,3.75rem)]
          leading-[0.8] font-bold"
        >
          Rick and Morty <br /> Characters
        </Link>
        <div className="w-full max-w-130">
          <SearchBar />
        </div>
        <Link
          to={"/favorites"}
          className="flex items-center gap-x-2 px-4 py-2 bg-primary
          hover:bg-gray-800 transition-all
          text-gray-100 rounded-4xl cursor-pointer"
        >
          <FavIcon className="size-5 fill-gray-100" />
          Favorites
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col gap-y-2 w-full max-w-xl">
          <Filter />
          <CharacterList />
        </div>
      </div>
    </div>
  );
}
