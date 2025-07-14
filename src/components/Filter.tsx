import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../hooks/useFilter";
import { Icon } from "../assets/icons/Icon";
import clsx from "clsx";

export function Filter() {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [statusFieldOpen, setStatusFieldOpen] = React.useState(false);
  const [speciesFieldOpen, setSpeciesFieldOpen] = React.useState(false);
  const [genderFieldOpen, setGenderFieldOpen] = React.useState(false);

  const { statusField, specieField, genderField, handleFilters } = useFilter();
  const [searchParams, setSearchParams] = useSearchParams();

  const paramsToArray = () => {
    const arr = [];
    for (const [key, value] of searchParams) {
      arr.push({ [key]: value });
    }
    return arr;
  };

  React.useEffect(() => {
    function handleClick(e: any) {
      if (e.target && !e.target.closest(".filters")) {
        setStatusFieldOpen(false);
        setSpeciesFieldOpen(false);
        setGenderFieldOpen(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav className="flex w-full max-w-[1180px] flex-col justify-center gap-2">
      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex items-center gap-2">
          {paramsToArray().map((param) => (
            <button
              onClick={() => {
                handleFilters(Object.keys(param)[0], Object.values(param)[0]);
              }}
              className="inline-flex cursor-pointer items-center justify-center
                gap-x-2 rounded-full bg-primary px-4 py-2 text-white"
              aria-label="Remove filter"
            >
              <Icon.Close className="size-[1.2rem] fill-white" />
              {Object.values(param)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={clsx(
            "inline-flex cursor-pointer justify-center gap-x-2 rounded-full px-4 py-2 text-white hover:bg-gray-800",
            filterOpen ? "bg-gray-800" : "bg-gray-900",
          )}
          aria-label="Apply filters"
        >
          <Icon.Filter
            className={clsx(
              "mt-[1px] size-[1.2rem] fill-white transition-all ease-linear",
              filterOpen ? "rotate-180" : "rotate-0",
            )}
          />
          Filter
        </button>
      </div>
      {filterOpen && (
        <div className="grid w-full gap-2 *:w-full md:grid-cols-3">
          <div className="filters relative cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800">
            {statusFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
                  bg-gray-900 py-4"
                role="group"
                aria-label="Status Filters"
              >
                <div className="flex flex-col">
                  {statusField.fields.map((field) => {
                    const id = `${field.group}-${field.value}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex w-full cursor-pointer
                      justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                      >
                        {field.value.charAt(0).toUpperCase() +
                          field.value.slice(1)}
                        <input
                          type="checkbox"
                          id={id}
                          name={field.group}
                          value={field.value}
                          className="peer sr-only"
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span
                          className="relative inline-flex size-5 cursor-pointer rounded-sm
                            border-2 border-gray-400 hover:border-gray-200
                            peer-checked:border-primary peer-checked:bg-primary"
                        ></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            <button
              onClick={() => setStatusFieldOpen(!statusFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
              aria-label="Status"
              aria-expanded={statusFieldOpen}
            >
              <span className="font-medium text-white">Status</span>
              <Icon.DropDown
                className={clsx(
                  "size-[1.5rem] fill-white transition-all ease-linear",
                  statusFieldOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          </div>
          <div className="filters relative flex cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800">
            {speciesFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
          bg-gray-900 py-4"
              >
                <div className="flex flex-col">
                  {specieField.fields.map((field) => {
                    const id = `${field.group}-${field.value}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex w-full cursor-pointer
                      justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                      >
                        {field.value.charAt(0).toUpperCase() +
                          field.value.slice(1)}
                        <input
                          type="checkbox"
                          id={id}
                          name={field.group}
                          value={field.value}
                          className="peer sr-only"
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span
                          className="relative inline-flex size-5 cursor-pointer rounded-sm
                            border-2 border-gray-400 hover:border-gray-200
                            peer-checked:border-primary peer-checked:bg-primary"
                        ></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            <button
              onClick={() => setSpeciesFieldOpen(!speciesFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
              aria-label="Species"
              aria-expanded={speciesFieldOpen}
            >
              <span className="font-medium text-white">Species</span>
              <Icon.DropDown
                className={clsx(
                  "size-[1.5rem] fill-white transition-all ease-linear",
                  speciesFieldOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          </div>
          <div className="filters relative flex cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800">
            {genderFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
          bg-gray-900 py-4"
              >
                <div className="flex flex-col">
                  {genderField.fields.map((field) => {
                    const id = `${field.group}-${field.value}`;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className="flex w-full cursor-pointer
                      justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                      >
                        {field.value.charAt(0).toUpperCase() +
                          field.value.slice(1)}
                        <input
                          type="checkbox"
                          id={id}
                          name={field.group}
                          value={field.value}
                          className="peer sr-only"
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span
                          className="relative inline-flex size-5 cursor-pointer rounded-sm
                            border-2 border-gray-400 hover:border-gray-200
                            peer-checked:border-primary peer-checked:bg-primary"
                        ></span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            <button
              onClick={() => setGenderFieldOpen(!genderFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
              aria-label="Gender"
              aria-expanded={genderFieldOpen}
            >
              <span className="font-medium text-white">Gender</span>
              <Icon.DropDown
                className={clsx(
                  "size-[1.5rem] fill-white transition-all ease-linear",
                  genderFieldOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
