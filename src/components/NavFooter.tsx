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
      <div className="grid w-full place-items-center">
        {scroll > 200 && (
          <button
            className="grid size-14 place-items-center rounded-full
              bg-gray-800 hover:bg-gray-700"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Icon.ArrowToUp className="size-[1.5rem] fill-white" />
          </button>
        )}
      </div>
    </div>
  );
}
