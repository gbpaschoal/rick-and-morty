import React from "react";
import { NavFooter } from "./NavFooter";

export function GridContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ul
        className="grid gap-2 sm:max-w-[96rem] sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4"
      >
        {children}
      </ul>
      <NavFooter />
    </>
  );
}
