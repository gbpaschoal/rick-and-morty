import * as React from "react";

export function useScrollTop(deps?: any) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [deps]);
}
