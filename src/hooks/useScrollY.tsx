import { useSyncExternalStore } from "react";

export function useScrollY() {
  const scroll = useSyncExternalStore(
    (cb) => {
      window.addEventListener("scroll", cb);
      return () => window.removeEventListener("scroll", cb);
    },
    () => window.scrollY,
    () => window.scrollY,
  );

  return scroll;
}
