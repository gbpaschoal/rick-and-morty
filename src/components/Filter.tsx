import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  RiEqualizerLine as FilterIcon,
  RiArrowDownSLine as FilterDropDownIcon,
} from "@remixicon/react";
import clsx from "clsx";
import { useClickOutside } from "../hooks/useClickOutside";

const FILTERS = [
  { group: "status", values: ["Alive", "Dead", "Unknown"] },
  {
    group: "species",
    values: ["Human", "Alien", "Mythologic", "Animal", "Robot", "Unknown"],
  },
  { group: "gender", values: ["Male", "Female", "Genderless", "Unknown"] },
];

// TODO: FIX BUT IN SEARCHPARAMS

function FilterDropDown({ filters }: { filters: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropDownRef = useClickOutside<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );

  //ADD MOTION ON DROPDOWN

  return (
    <div className="w-full">
      <div ref={dropDownRef} className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-2
              cursor-pointer rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
          aria-label={
            filters.group.charAt(0).toUpperCase() + filters.group.slice(1)
          }
          aria-expanded={isOpen}
        >
          <span className="font-medium text-gray-100">
            {filters.group.charAt(0).toUpperCase() + filters.group.slice(1)}
          </span>
          <FilterDropDownIcon
            size={20}
            className={clsx(
              "fill-gray-100 transition-all",
              isOpen ? "rotate-180" : "rotate-0",
            )}
          />
        </button>

        {isOpen && (
          <div
            className="absolute inset-x-0 top-[112%] z-3 rounded-lg
                  bg-gray-800 py-4"
            role="group"
            aria-label="Status Filters"
          >
            <ul className="flex flex-col">
              {filters.values.map((field) => {
                const id = `${filters.group}-${field}`;
                const isChecked = searchParams.has(filters.group, field);
                return (
                  <li key={id} className="">
                    <label
                      htmlFor={id}
                      className="check-input flex w-full cursor-pointer
                        justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-700"
                    >
                      {field}
                      <input
                        type="checkbox"
                        id={id}
                        name={filters.group}
                        value={field}
                        className="peer sr-only"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSearchParams((prev) => {
                              const params = new URLSearchParams(prev);

                              params.delete(filters.group);

                              return params;
                            });

                            return;
                          }
                          setSearchParams(
                            (prev) => {
                              const params = new URLSearchParams(prev);

                              params.set(filters.group, field);

                              return params;
                            },
                            { replace: true },
                          );
                        }}
                      />
                      <span
                        className="relative inline-flex size-5 cursor-pointer rounded-xs
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
    </div>
  );
}

export function Filter() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const filterGroups = FILTERS.map((filter) => filter.group);

  const selectedFilters = Object.fromEntries(
    [...searchParams.entries()].filter(([key]) => filterGroups.includes(key)),
  );

  return (
    <div className="stack-2">
      <div className="inline-stack-2 justify-end">
        {/* {Object.keys(selectedFilters).length > 0 && (
          <Button
            onClick={() => {
              FILTERS.map((filter) => {
                setSearchParams(
                  (prev) => {
                    prev.delete(filter.group);
                    return prev;
                  },
                  { replace: true },
                );
              });
            }}
            className="bg-primary"
            aria-label="Clear filters"
          >
            <CloseIconLarge
              size={14}
              className="fill-gray-100 transition-all"
            />
            Clear All
          </Button>
        )} */}

        <button
          onClick={() => setIsFilterOpen((prev) => !prev)}
          className={clsx(
            "relative inline-stack-2 cursor-pointer gap-x-2 rounded-4xl px-4 py-2 text-gray-100",
            isFilterOpen ? "bg-gray-700" : "bg-gray-800",
          )}
          aria-label="Apply filters"
        >
          {Object.keys(selectedFilters).length > 0 && (
            <div className="absolute top-[-20%] right-[-6%]">
              <span className="grid place-items-center w-6 aspect-square text-[.812rem] font-bold rounded-full bg-primary">
                {Object.keys(selectedFilters).length}
              </span>
            </div>
          )}
          <FilterIcon
            size={18}
            className="mt-px fill-gray-100 transition-all"
          />
          Filter
        </button>
      </div>
      {/* ADD: SELECTED DROPDOWN  */}

      {isFilterOpen && (
        <ul className="grid w-full gap-2 md:grid-cols-3">
          {FILTERS.map((filter, i) => {
            return (
              <li key={i}>
                <FilterDropDown filters={filter} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
