import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../assets/icons/Icon";
import { SearchModalContext } from "./Search";

export default function Header() {
  const { openModal } = React.useContext(SearchModalContext);
  return (
    <header className="fixed left-0 top-0 z-3 w-full bg-black py-2">
      <div className="mx-auto flex w-[90%] items-center justify-between rounded-full bg-gray-900 px-4">
        <Link to="/" className="size-[3rem] sm:size-[3.5rem]">
          <Icon.Logo className="max-w-full cursor-pointer fill-gray-400 hover:fill-gray-200" />
        </Link>
        <div className="flex gap-2 sm:hidden">
          <button onClick={openModal} className="rounded-full p-2">
            <Icon.Search className="size-[1.5rem] fill-gray-400" />
          </button>
          <Link to="fav" className="rounded-full p-2">
            <Icon.Fav className="size-[1.5rem] fill-gray-400" />
          </Link>
        </div>
        <div className="max-sm:hidden">
          <Link
            to="fav"
            className="inline-grid cursor-pointer
              place-items-center rounded-full bg-primary px-4 py-2
              md:px-5 md:py-3"
          >
            Favorites
          </Link>
        </div>
      </div>
    </header>
  );
}
