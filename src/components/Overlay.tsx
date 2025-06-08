import React from "react";
import * as Icon from "../assets/icons";

export function Overlay({ children, closeModal }) {
  return (
    <div className="fixed inset-0 z-4 flex flex-col px-4">
      <div
        onClick={closeModal}
        className="absolute inset-0 -z-1 p-4 backdrop-blur-md"
      >
        <button className="ml-auto grid place-items-center">
          <Icon.Close className="fill-gray-200 hover:fill-white" />
        </button>
      </div>
      {children}
    </div>
  );
}
