import { SpinnerCircularFixed } from "spinners-react";
import { useEffect, useState } from "react";

export function Spinner({ enabled }: { enabled: boolean }) {
  // const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   let timeout: any;

  //   if (enabled) {
  //     timeout = setTimeout(() => {
  //       setVisible(true);
  //     }, 1900);
  //   } else {
  //     setVisible(false);
  //   }

  //   return () => clearTimeout(timeout);
  // }, [enabled]);

  return (
    <SpinnerCircularFixed
      size={30}
      thickness={150}
      color="var(--gray-400)"
      secondaryColor="var(--gray-900)"
      speed={200}
      enabled={enabled}
    />
  );
}
