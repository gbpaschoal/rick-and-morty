import React from "react";
import { Icon } from "../assets/icons/Icon";
import { useScroll } from "../hooks/useScroll";

export function NavFooter() {
  const scroll = useScroll();

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-3 flex w-full justify-center
        py-4 *:pointer-events-auto"
    >
      <div className="flex w-full items-center justify-center gap-2">
        {scroll > 200 && (
          <button
            className="inline-grid size-14 place-items-center rounded-full
              bg-gray-800 hover:bg-gray-700"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <Icon.ArrowToUp className="size-[1.5rem] fill-white" />
          </button>
        )}
      </div>
    </div>
  );
}
