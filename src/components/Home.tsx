import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { Filter } from "./Filter";
import { RiHeartLine as FavIcon } from "@remixicon/react";
import { CharacterList } from "./CharacterList";

export function Home() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex-y items-center gap-y-4">
        <h1
          className="text-gray-100 text-center text-[clamp(2.25rem,10vw,3.75rem)]
          leading-[0.8] font-bold"
        >
          Rick and Morty <br /> Characters
        </h1>
        <div className="w-full max-w-lg">
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

      <div className="flex-y">
        <div>
          <div className="w-full py-2">
            <Filter />
          </div>
          <CharacterList />
        </div>
      </div>
    </div>
  );
}
