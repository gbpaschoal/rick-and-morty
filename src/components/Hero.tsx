import GridContainer from "./GridContainer";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import React from "react";
import { SearchModalContext } from "./Search";
import clsx from "clsx";
import * as Icon from "../assets/icons";

const SearchBar = () => {
  const { openModal } = React.useContext(SearchModalContext);

  return (
    <div
      className={clsx(
        "relative w-full max-w-[31rem] rounded-xl bg-gray-900 px-4 max-sm:hidden",
        "bg-gray-800",
        "cursor-pointer hover:bg-gray-800",
      )}
      onClick={openModal}
    >
      <div className="flex w-full items-center">
        <Icon.Search className="mx-[6px] mt-[3px] size-[1.5rem] fill-gray-400" />
        <span
          className="inline-flex h-12 w-full flex-1 cursor-pointer items-center border-none
            bg-transparent font-medium
            leading-3 text-gray-400 outline-none"
        >
          Search Characters
        </span>
      </div>
    </div>
  );
};

export default function Hero() {
  const { data, state, fetchNextPage } = useFetchCharacters();

  return (
    <div className="flex flex-col items-center gap-y-6">
      {/* <div className="w-full flex flex-col gap-y-4 items-center mb-4 px-2">
        <h1 className="font-bold text-center text-gray-100
          text-[2.2rem] sm:text-[3rem] lg:text-[3.5rem] leading-none
          tracking-tight">
          Rick and Morty <br /> Characters
        </h1>
        <SearchBar />
      </div> */}
      <GridContainer
        data={data?.pages.flatMap((page) => page.results)}
        state={state}
        fetchMore={fetchNextPage}
      />
    </div>
  );
}
