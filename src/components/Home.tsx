import { GridContainer } from "./GridContainer";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import React from "react";
import { Icon } from "../assets/icons/Icon";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useWidth } from "../hooks/useWidth";
import { CardCharacter } from "./CardCharacter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { CharacterResponse } from "../types/Characters";
import { useQueryStore } from "../store/queryStore";
import { Filter } from "./Filter";
import { Spinner } from "./Spinner";

export const SearchBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, setQuery } = useQueryStore();

  const { data: characters } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data } = await axios.get<CharacterResponse>(
        `${"https://rickandmortyapi.com/api/character?page=1"}&name=${query}`,
      );
      const shortVersion = data.results.slice(0, 6);
      return shortVersion;
    },
    placeholderData: (previousData) => previousData,
  });

  React.useEffect(() => {
    function handleClick(e: any) {
      if (e.target && !e.target.closest(".search-bar")) {
        setIsOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative z-3 w-full max-w-lg">
      <div className="relative z-1 w-full">
        <div
          className="search-bar flex w-full items-center gap-x-2
        rounded-4xl bg-gray-900 pl-4 pr-6"
          aria-expanded={isOpen}
        >
          <Icon.Search className="mt-[1px] size-[1.4rem] fill-gray-400" />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get("search") as string;

              if (search.trim() === "") {
                setIsOpen(false);
                return;
              }

              searchParams.set("name", search);
              setSearchParams(searchParams);
              setIsOpen(false);
            }}
            className="w-full"
          >
            <input
              onChange={(e) => {
                setQuery(e.target.value);

                if (e.target.value.trim() === "") {
                  setIsOpen(false);
                  return;
                }
                setIsOpen(true);
              }}
              type="text"
              value={query}
              name="search"
              placeholder="Search Characters"
              autoComplete="off"
              autoCapitalize="off"
              className="h-12 w-full border-none
                bg-transparent text-gray-200 outline-none"
            />
          </form>
        </div>
      </div>
      {isOpen && characters && (
        <div className="absolute inset-x-0 top-0 z-0 rounded-4xl bg-gray-900">
          <ul className="mt-12 flex flex-col pb-6">
            {characters.map((data: any) => (
              <li
                key={data.id}
                className="cursor-pointer px-5 py-2 hover:bg-gray-800"
                onClick={() => {
                  searchParams.set("name", data.name);
                  setSearchParams(searchParams);
                }}
              >
                <span className="font-medium text-gray-200">{data.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export function Home() {
  const { data, isFetching, isError, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(fetchNextPage);
  const characterList = data?.pages.flatMap((page) => page.results);
  const width = useWidth();

  return (
    <div className="flex flex-col items-center gap-y-2">
      <div className="flex w-full flex-col items-center gap-y-4 px-2">
        <Link to="/" aria-label="Clear Filters">
          <h1
            className="text-center text-[2.2rem] font-bold leading-none
              tracking-tight text-gray-100 sm:text-[3rem]
              lg:text-[3.5rem]"
          >
            Rick and Morty <br /> Characters
          </h1>
        </Link>
        <div className="flex w-full max-w-xl items-center justify-center gap-2">
          <SearchBar />
          <Link
            to="fav"
            className="inline-grid flex-shrink-0 cursor-pointer place-items-center
              rounded-[calc(.5_*_48px)] bg-primary text-white max-sm:size-12
              sm:px-4 sm:py-3"
            aria-label="Favorites"
          >
            {width < 448 ? (
              <Icon.Fav className="size-6 fill-white" />
            ) : (
              "Favorites"
            )}
          </Link>
        </div>
      </div>
      <Filter />
      <div>
        {isError && (
          <span className="mx-0 inline-block font-medium text-gray-400">
            {"No founds :("}
          </span>
        )}
      </div>
      <GridContainer>
        {characterList &&
          characterList.map((character, i) => {
            const isTheLastOne = characterList.length - 1 === i;
            return (
              <li key={character.id} ref={isTheLastOne ? observer : null}>
                <CardCharacter character={character} />
              </li>
            );
          })}
      </GridContainer>
      <div className="py-4">
        {isFetching && (
          <Spinner enabled={isFetching}/>
        )}
      </div>
    </div>
  );
}
