import { SearchBar } from "./SearchBar";
import { useScroll } from "../hooks/useScroll";
import { Link } from "react-router-dom";
import { Fav } from "../assets/icons";

export function Header() {
  const scroll = useScroll();

  return (
    <header className="fixed left-0 top-0 z-3 w-full bg-black">
      <div className="grid grid-cols-[1fr_auto] [grid-template-areas:'b_c'] md:grid-cols-[minmax(44px,auto)_1fr_auto] md:[grid-template-areas:'._b_c'] gap-x-2 p-2">
        {scroll > 250 ? (
          <div className="[grid-area:b] flex justify-center">
            <SearchBar />
          </div>
        ) : null}
        <div className="[grid-area:c]">
          <Link
            to="fav"
            className="flex gap-x-2 cursor-pointer items-center
                rounded-lg bg-gray-800 text-white
                p-3 hover:bg-gray-700"
            aria-label="Favorites"
          >
            <Fav className="size-5 fill-white" />
          </Link>
        </div>
      </div>
    </header >
  );
}
