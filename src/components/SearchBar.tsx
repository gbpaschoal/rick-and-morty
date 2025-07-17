import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryStore } from "../store/queryStore";
import { useQuery } from "@tanstack/react-query";
import { CharacterResponse } from "../types/Characters";
import { Icon } from "../assets/icons/Icon";
import axios from "axios";

export function SearchBar() {
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
}
