import { useLayoutEffect, useRef } from "react";

export function useAutoGrid<T extends HTMLElement>({
  minWidth = 280,
  minCols = 2,
  maxCols = 4,
} = {}) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const updateCols = () => {
      const width = element.clientWidth;

      const cols = Math.min(
        maxCols,
        Math.max(minCols, Math.floor(width / minWidth)),
      );

      element.style.setProperty("--cols", String(cols));
    };

    updateCols();

    const observer = new ResizeObserver(updateCols);

    observer.observe(element);

    return () => observer.disconnect();
  }, [minWidth, maxCols]);

  return ref;
}
