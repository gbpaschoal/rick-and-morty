import React from "react";

export const useIntersectionObserver = (func: () => Promise<void>) => {
  const [observerRef, setObserverRef] = React.useState<HTMLElement | null>(null);
  const isFetchingRef = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
          if (entry.isIntersecting && !isFetchingRef.current) {
            isFetchingRef.current = true;
            await func();
            isFetchingRef.current = false;
          }
      },
      { rootMargin: '200px' }
    );

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.disconnect;
      }
    };
  }, [observerRef]);

  return setObserverRef
}