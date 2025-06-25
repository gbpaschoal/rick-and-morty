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

export const SearchBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryStore = useQueryStore((state) => state.query);
  const setQueryStore = useQueryStore((state) => state.setQuery);

  const { data: characters } = useQuery({
    queryKey: ["search", queryStore],
    queryFn: async () => {
      const { data } = await axios.get<CharacterResponse>(
        `${"https://rickandmortyapi.com/api/character?page=1"}&name=${queryStore}`,
      );
      const shortVersion = data.results.slice(0, 6);
      return shortVersion;
    },
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
    <div className="relative top-[90%] z-2 w-full max-w-lg">
      <div className="search-bar relative z-1 flex w-full items-center gap-x-2 rounded-[calc(.5_*_48px)] bg-gray-900 pl-4 pr-6">
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
              setQueryStore(e.target.value);

              if (e.target.value.trim() === "") {
                setIsOpen(false);
                return;
              }
              setIsOpen(true);
            }}
            type="text"
            value={queryStore}
            name="search"
            placeholder="Search Characters"
            autoComplete="off"
            autoCapitalize="off"
            className="inline-flex h-12 w-full flex-1 items-center border-none
                bg-transparent text-gray-200 outline-none"
          />
        </form>
      </div>
      {isOpen && characters && (
        <div className="absolute left-0 top-0 z-0 w-full rounded-[calc(.5_*_48px)] bg-gray-900">
          <div className="mt-12 pb-6">
            <ul className="flex flex-col">
              {characters.map((data: any) => (
                <li
                  key={data.id}
                  className="w-full cursor-pointer px-5 py-2 hover:bg-gray-800"
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
        </div>
      )}
    </div>
  );
};

export function Hero() {
  const { data, fetchNextPage } = useFetchCharacters();
  const observer = useIntersectionObserver(fetchNextPage);
  const characterList = data?.pages.flatMap((page) => page.results);
  const width = useWidth();

  return (
    <div className="flex flex-col items-center gap-y-6">
      <div className="mb-4 flex w-full flex-col items-center gap-y-4 px-2">
        <Link to="/">
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
            to="/fav"
            className="inline-grid flex-shrink-0 cursor-pointer place-items-center
              rounded-full bg-primary text-white max-sm:size-12
              sm:px-5 sm:py-3"
          >
            {width < 448 ? (
              <Icon.Fav className="size-[1.5rem] fill-gray-100" />
            ) : (
              "Favorites"
            )}
          </Link>
        </div>
      </div>
      <GridContainer>
        {characterList &&
          characterList.map((character, i) => {
            const isTheLastOne = characterList.length - 1 === i;
            if (isTheLastOne) {
              return (
                <li key={character.id} ref={observer}>
                  <CardCharacter character={character} />
                </li>
              );
            }
            return (
              <li key={character.id}>
                <CardCharacter character={character} />
              </li>
            );
          })}
      </GridContainer>
    </div>
  );
}
