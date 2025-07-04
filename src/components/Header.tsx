import { Link } from "react-router-dom";
import { Icon } from "../assets/icons/Icon";
import { SearchBar } from "./Home";
import { useWidth } from "../hooks/useWidth";
import { useScroll } from "../hooks/useScroll";

export function Header() {
  const width = useWidth();
  const scroll = useScroll();

  return (
    <header className="fixed left-0 top-0 z-3 w-full bg-[var(--background)]">
      {scroll > 200 ? (
        <div className="flex w-full items-center justify-center gap-2 px-2 py-2">
          <SearchBar />
          <Link
            to="fav"
            className="inline-grid flex-shrink-0 cursor-pointer place-items-center
                      rounded-[calc(.5_*_48px)] bg-primary text-white max-sm:size-12
                      sm:px-4 sm:py-3"
            aria-label="Favorites"
          >
            {width < 448 ? (
              <Icon.Fav className="size-6 fill-white" />
            ) : (
              "Favorites"
            )}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
