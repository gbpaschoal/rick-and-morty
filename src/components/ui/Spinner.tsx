import { SpinnerCircularFixed } from "spinners-react";

export function Spinner({ enabled }: { enabled: boolean }) {
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
