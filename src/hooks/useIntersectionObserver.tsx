import React from "react";

export const useIntersectionObserver = (func: () => void | unknown) => {
  const [observerRef, setObserverRef] = React.useState<HTMLElement | null>(
    null,
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          func();
        }
      },
      { rootMargin: "200px" },
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.disconnect();
      }
    };
  }, [observerRef]);

  return setObserverRef;
};
