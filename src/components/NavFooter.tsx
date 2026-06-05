import { RiArrowUpLine as ArrowToUp } from "@remixicon/react";
import { useScrollY } from "../hooks/useScroll";
import { FavIconFill } from "./ui/Icon";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

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
          <Button
            as="button"
            variant="secondary"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowToUp className="size-6 sm:size-8" />
          </Button>
        )}

        <Button as={Link} to="favorites">
          <FavIconFill className="size-6 sm:size-8" />
        </Button>
      </div>
    </div>
  );
}
