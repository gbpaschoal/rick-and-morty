import React from "react";

export function useScroll() {
  const scroll = React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY,
    () => window.scrollY,
  );

  return scroll;
}
