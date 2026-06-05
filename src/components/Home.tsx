import { Link } from "react-router-dom";
import { SearchBar } from "./Search";
import { Filter } from "./Filter";
import { CharacterList } from "./CharacterList";

export function Home() {
  return (
    <div className="stack-2">
      <div className="stack-4 items-center">
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
      </div>
      <div className="mx-auto stack-2 w-full max-w-xl">
        <Filter />
        <CharacterList />
      </div>
    </div>
  );
}
