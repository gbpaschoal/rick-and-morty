import { RiArrowUpLine as ArrowToUp } from "@remixicon/react";
import { useScrollY } from "../hooks/useScroll";

export function NavFooter() {
  const scrollY = useScrollY();
  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-3 flex w-full justify-center
        py-4 *:pointer-events-auto"
    >
      <div className="grid w-full place-items-center">
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
      </div>
    </div>
  );
}
