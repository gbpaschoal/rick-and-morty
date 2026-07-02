import { useState } from "react";
import clsx from "clsx";
import { CloseIconLarge, FilterDropDownIcon, FilterIcon } from "./ui/icons";
import { useClickOutside } from "../hooks/useClickOutside";
import { useSearchParams } from "react-router";

const FILTERS = [
  { group: "status", values: ["Alive", "Dead", "Unknown"] },
  {
    group: "species",
    values: ["Human", "Alien", "Mythologic", "Animal", "Robot", "Unknown"],
  },
  { group: "gender", values: ["Male", "Female", "Genderless", "Unknown"] },
] as const;

type Filter = (typeof FILTERS)[number];

function FilterDropDown({ filter }: { filter: Filter }) {
  const [isOpen, setIsOpen] = useState(false);
  const group = filter.group;

  const dropDownRef = useClickOutside<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const isDropDownChecked = searchParams.has(group);

  return (
    <div ref={dropDownRef} className="w-full relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between text-center text-gray-100 px-4 py-2
          cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
      >
        <div className="flex-x-2">
          <span className="font-medium">
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </span>
          {isDropDownChecked && (
            <span className="grid place-items-center size-2.5 font-bold rounded-full bg-primary"></span>
          )}
        </div>
        <FilterDropDownIcon
          size={20}
          className={clsx("transition-all", isOpen ? "rotate-180" : "rotate-0")}
        />
      </button>
      {isOpen && (
        <div
          className="absolute inset-x-0 top-[112%] z-3 rounded-lg
                  bg-gray-800 py-4"
        >
          <ul>
            {filter.values.map((field) => {
              const id = `${group}-${field}`;
              const isChecked = searchParams.has(group, field);
              return (
                <li key={id}>
                  <label
                    htmlFor={id}
                    className="check-input flex w-full cursor-pointer
                        justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      id={id}
                      name={group}
                      value={field}
                      checked={isChecked}
                      className="peer sr-only"
                      onChange={() => {
                        if (isChecked) {
                          searchParams.delete(group);
                          setSearchParams(searchParams, { replace: true });
                          return;
                        }
                        searchParams.set(group, field);
                        setSearchParams(searchParams, { replace: true });
                      }}
                    />
                    {field}
                    <span
                      className="relative size-5 cursor-pointer rounded-xs
                              border-2 border-gray-400 hover:border-gray-200
                              peer-checked:border-primary peer-checked:bg-primary"
                    ></span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export function Filter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSeachParams] = useSearchParams();
  const filterGroups = FILTERS.map((filter) => filter.group);
  const selectedFilters = Object.fromEntries(
    // @ts-ignore
    [...searchParams.entries()].filter(([key]) => filterGroups.includes(key)),
  );

  return (
    <div className="flex-y-2">
      <div className="flex justify-end">
        <div className="flex-x-2">
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={() => {
                FILTERS.forEach((f) => {
                  searchParams.delete(f.group);
                });
                setSeachParams(searchParams, { replace: true });
              }}
              className="relative flex-x-2 cursor-pointer rounded-4xl px-4 py-2
          text-gray-100 bg-primary"
              aria-label="Open filters"
            >
              <CloseIconLarge size={18} />
              Remove All
            </button>
          )}
          <button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className="relative flex-x-2 cursor-pointer rounded-4xl px-4 py-2
          text-gray-100 bg-gray-800 hover:bg-gray-700"
            aria-label="Open filters"
          >
            {Object.keys(selectedFilters).length > 0 && (
              <div className="absolute top-[-20%] right-[-6%]">
                <span className="grid place-items-center w-6 aspect-square text-[.812rem] font-bold rounded-full bg-primary">
                  {Object.keys(selectedFilters).length}
                </span>
              </div>
            )}
            <FilterIcon size={18} />
            Filter
          </button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="grid w-full gap-2 md:grid-cols-3">
          {FILTERS.map((filter, i) => {
            return <FilterDropDown key={i} filter={filter} />;
          })}
        </div>
      )}
    </div>
  );
}
