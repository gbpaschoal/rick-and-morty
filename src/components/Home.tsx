import { Link } from "react-router";
import { Search } from "./Search";
import { CharacterList } from "./CharacterList";
import { Filter } from "./Filter";

export function Home() {
  return (
    <div className="flex-y-2">
      <div className="flex-y-4 items-center">
        <Link
          to="/"
          className="text-gray-100 text-center text-[clamp(2.25rem,10vw,3.75rem)]
          leading-[0.8] font-bold"
        >
          Rick and Morty <br /> Characters
        </Link>
        <div className="w-full max-w-130">
          <Search />
        </div>
      </div>
      <div className="mx-auto flex-y-2 w-full max-w-xl">
        <Filter />
        <CharacterList />
      </div>
    </div>
  );
}
