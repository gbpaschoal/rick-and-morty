import { SearchBar } from "./SearchBar";
import { useScroll } from "../hooks/useScroll";

export function Header() {
  const scroll = useScroll();

  return (
    <header className="fixed inset-x-0 top-0 z-3 bg-(--background)">
      <div className="flex items-center justify-center p-2">
        {scroll > 250 ? (
          <div className="flex-1 max-w-lg">
            <SearchBar />
          </div>
        ) : null}
      </div>
    </header>
  );
}
