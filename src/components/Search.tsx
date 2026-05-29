import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  RiSearchLine as SearchIcon,
  RiCloseLine as CloseIcon,
} from "@remixicon/react";
import { getCharactersByName } from "../api/characters";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("name") || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryName = searchParams.get("name");
    queryName ? setQuery(queryName) : "";
  }, [searchParams]);

  const { data: characters } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getCharactersByName(query),
    placeholderData: (previousData) => previousData,
  });

  const firstCharacters = characters && characters.results.slice(0, 6);

  useEffect(() => {
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
    <div className="relative z-2">
      <form
        className="flex items-center gap-x-2
          rounded-4xl bg-gray-800 px-4"
        aria-expanded={isOpen}
        onSubmit={(e) => {
          e.preventDefault();

          if (query.trim() === "") {
            setIsOpen(false);
            return;
          }

          setSearchParams(
            (prev) => {
              const params = new URLSearchParams(prev);

              params.set("name", query);

              return params;
            },
            { replace: true },
          );
          setIsOpen(false);
          navigate(`/?name=${query}`, { replace: true });
        }}
      >
        <SearchIcon size={20} className="mt-px fill-gray-400" />
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
          type="text"
          value={query}
          name="search"
          placeholder="Find Characters"
          autoComplete="off"
          autoCapitalize="off"
          className="h-12 w-full border-none
                  bg-transparent text-gray-200 outline-hidden pr-2"
        />
        {query.trim() && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSearchParams(
                (prev) => {
                  const params = new URLSearchParams(prev);

                  params.delete("name");

                  return params;
                },
                { replace: true },
              );

              if (isOpen) setIsOpen(false);

              inputRef.current?.focus();
            }}
            className="group absolute right-0 bg-inherit grid place-items-center w-12
              aspect-square rounded-4xl cursor-pointer"
          >
            <CloseIcon
              size={20}
              className="fill-gray-400 group-hover:fill-gray-100 transition-all"
            />
          </button>
        )}
      </form>
      {isOpen && (
        <div className="absolute inset-x-0 top-0 -z-1 pb-8 rounded-4xl bg-gray-800">
          <ul className="mt-12 flex flex-col min-h-35 overflow-hidden">
            {firstCharacters!.map((data: any) => (
              <li
                key={data.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-700"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      const params = new URLSearchParams(prev);

                      params.set("name", data.name);

                      return params;
                    },
                    { replace: true },
                  );
                  navigate(`/?name=${data.name}`, { replace: true });
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
