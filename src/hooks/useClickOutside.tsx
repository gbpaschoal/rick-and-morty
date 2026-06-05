import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  enabled: boolean,
  onClickOutside: () => void,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    function handleMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, onClickOutside]);

  return ref;
}
