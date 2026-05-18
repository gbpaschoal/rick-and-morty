import { RiArrowUpLine as ArrowToUp } from "@remixicon/react";
import { useScrollY } from "../hooks/useScroll";
import { FavIcon, FavIconFill } from "./ui/Icon";
import { Link } from "react-router-dom";

export function NavFooter() {
  const scrollY = useScrollY();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 left-0 z-3
        py-4 *:pointer-events-auto flex justify-center"
    >
      <div className="flex items-center justify-end gap-x-2 w-full max-w-xl">
        {scrollY > 200 && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group grid size-14 place-items-center cursor-pointer rounded-full
          bg-white transition-all
           hover:bg-gray-900"
          >
            <ArrowToUp
              className="size-6 fill-black group-hover:fill-gray-200 transition-all
          sm:size-8"
            />
          </button>
        )}
        <Link
          to="favorites"
          className="group grid size-14 place-items-center cursor-pointer rounded-full
          bg-primary
           "
        >
          <FavIconFill
            className="size-6 fill-gray-100
          sm:size-8"
          />
        </Link>
      </div>
    </div>
  );
}
