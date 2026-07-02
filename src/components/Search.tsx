import { useEffect, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "./ui/icons";
import { useClickOutside } from "../hooks/useClickOutside";
import { useQuery } from "@tanstack/react-query";
import { getCharactersByName } from "../api";
import { useSearchParams } from "react-router";

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchModalRef = useClickOutside<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );

  useEffect(() => {
    const updateQueryState = () => {
      setQuery(searchParams.get("name") ?? "");
    };

    updateQueryState();
  }, [searchParams]);

  const { data: characters } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getCharactersByName(query),
    placeholderData: (previousData) => previousData,
  });

  const firstCharacters = characters && characters.results.slice(0, 6);

  // ADD ARIA
  return (
    <div ref={searchModalRef} className="relative z-2">
      <form
        className="flex-x-2
          rounded-4xl bg-gray-800 px-4"
        onSubmit={(e) => {
          e.preventDefault();

          if (query.trim() === "") {
            setIsOpen(false);
            return;
          }

          searchParams.set("name", query);
          setSearchParams(searchParams);
          setIsOpen(false);
        }}
      >
        <SearchIcon size={20} className="fill-gray-400" />
        <input
          ref={inputRef}
          onChange={(e) => {
            setQuery(e.target.value);

            if (e.target.value.trim() === "") {
              setIsOpen(false);
              return;
            }
            setIsOpen(true);
          }}
          value={query}
          type="text"
          name="search"
          placeholder="Find Characters"
          autoComplete="off"
          autoCapitalize="off"
          className="h-12 w-full outline-hidden text-gray-200"
        />
        {query.trim() && (
          <button
            type="button"
            onClick={() => {
              setQuery("");

              if (isOpen) setIsOpen(false);

              inputRef.current?.focus();
            }}
            className="group absolute right-2 inline-grid
            place-items-center p-2 cursor-pointer"
          >
            <CloseIcon
              size={20}
              className="fill-gray-400 group-hover:fill-gray-100 transition-all"
            />
          </button>
        )}
      </form>
      {isOpen && (
        <div className="absolute top-0 inset-x-0 -z-1 pb-8 rounded-4xl bg-gray-800">
          <ul className="flex flex-col mt-12 min-h-35 overflow-y-hidden">
            {firstCharacters!.map((character) => (
              <li
                key={character.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                onClick={() => {
                  searchParams.set("name", character.name);
                  setSearchParams(searchParams);
                  setIsOpen(false);
                }}
              >
                <span className="font-medium text-gray-200">
                  {character.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
