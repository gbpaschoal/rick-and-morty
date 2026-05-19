import { RiArrowUpLine as ArrowToUp } from "@remixicon/react";
import { useScrollY } from "../hooks/useScroll";
import { FavIconFill } from "./ui/Icon";
import { Link } from "react-router-dom";

export function NavFooter() {
  const scrollY = useScrollY();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 left-0 z-3
    flex justify-center py-4
    bg-linear-to-t from-black/60 via-black/20 to-transparent"
    >
      <div className="*:pointer-events-auto flex max-sm:flex-col max-sm:items-end items-center justify-end gap-2 w-full max-w-xl px-2">
        {scrollY > 200 && (
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group grid size-14 place-items-center cursor-pointer rounded-full
        bg-white transition-all hover:bg-gray-900"
          >
            <ArrowToUp
              className="size-6 fill-black transition-all
          group-hover:fill-gray-200 sm:size-8"
            />
          </button>
        )}

        <Link
          to="favorites"
          className="group grid size-14 place-items-center cursor-pointer rounded-full
      bg-primary"
        >
          <FavIconFill className="size-6 fill-gray-100 sm:size-8" />
        </Link>
      </div>
    </div>
  );
}
