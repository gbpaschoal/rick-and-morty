import { SearchBar } from "./Search";
import { useScrollY } from "../hooks/useScroll";

export function Header() {
  const scrollY = useScrollY();

  return (
    <header className="fixed inset-x-0 top-0 z-3 bg-(--background)">
      <div className="flex items-center justify-center p-2">
        {scrollY > 250 ? (
          <div className="w-full max-w-130">
            <SearchBar />
          </div>
        ) : null}
      </div>
    </header>
  );
}
