import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../assets/icons/Icon";
import { SearchBar } from "./Hero";

export default function Header() {
  const width = React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth,
    () => window.innerWidth,
  );

  const scroll = React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY,
    () => window.scrollY,
  );

  return (
    <header className="fixed left-0 top-0 z-3 w-full bg-black py-2">
      {scroll > 200 ? (
        <div className="flex w-full items-center justify-center gap-2 px-2">
          <SearchBar />
          <Link
            to="fav"
            className="inline-grid flex-shrink-0 cursor-pointer place-items-center
                      rounded-full bg-primary text-white max-sm:size-12
                      sm:px-5 sm:py-3"
          >
            {width < 448 ? (
              <Icon.Fav className="size-[1.5rem] fill-gray-100" />
            ) : (
              "Favorites"
            )}
          </Link>
        </div>
      ) : null}
    </header>
  );
}
