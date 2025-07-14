import { SearchBar } from "./Home";
import { useScroll } from "../hooks/useScroll";
import { ButtonFavorite } from "./Favorites";

export function Header() {
  const scroll = useScroll();
  return (
    <header className="fixed left-0 top-0 z-3 w-full bg-[var(--background)]">
      {scroll > 200 ? (
        <div className="flex w-full items-center justify-center gap-2 px-2 py-2.5">
          <SearchBar />
          <ButtonFavorite />
        </div>
      ) : null}
    </header>
  );
}
