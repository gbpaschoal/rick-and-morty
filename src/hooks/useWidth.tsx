import React from "react";

export function useWidth() {
  const width = React.useSyncExternalStore(
    (cb) => {
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    },
    () => window.innerWidth,
    () => window.innerWidth,
  );
  return width;
}
