import React from "react";
import { Filter } from "./Filter";
import { Icon } from "../assets/icons/Icon";

export default function NavFooter() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const verifyScrollHeight = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener("scroll", verifyScrollHeight);
    return () => document.removeEventListener("scroll", verifyScrollHeight);
  }, []);
  return (
    <div
      className="bg-special pointer-events-none fixed bottom-0 left-0 z-3 flex
        w-full flex-row items-center justify-end
        gap-2 px-2 py-4 *:pointer-events-auto"
    >
      {isVisible && (
        <button
          className="inline-grid size-14 place-items-center rounded-full bg-primary md:size-16"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Icon.ArrowToUp className="size-[1.5rem] fill-white" />
        </button>
      )}

      <Filter />
    </div>
  );
}
