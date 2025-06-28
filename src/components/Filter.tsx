import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../hooks/useFilter";
import { Icon } from "../assets/icons/Icon";

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
        ((bol) => {
          setStatusFieldOpen(bol);
          setSpeciesFieldOpen(bol);
          setGenderFieldOpen(bol);
        })(false);
      }
    }

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav className="flex w-full max-w-[1180px] flex-col justify-center gap-2">
      <div className="flex flex-1 justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {paramsToArray().map((param) => (
            <button
              onClick={() => {
                handleFilters(
                  Object.keys(param)[0],
                  Object.values(param)[0],
                );
              }}
              className="inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-primary px-4 py-2 text-white"
            >
              <Icon.Close className="size-[1.2rem] fill-white" />
              {Object.values(param)[0].charAt(0).toUpperCase() +
              Object.values(param)[0].slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="inline-flex cursor-pointer justify-center gap-x-2 rounded-full bg-gray-900 px-4 py-2 text-white
        hover:bg-gray-900 "
        >
          <Icon.Filter className="size-[1.5rem] fill-white" />
        Filter
        </button>
      </div>
      {filterOpen && (
        <div className="grid w-full place-items-center gap-2 *:w-full md:grid-cols-3">
          <div className="filters relative cursor-pointer rounded-lg bg-gray-900">
            {statusFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
          bg-gray-900 py-4"
              >
                <div className="flex flex-col">
                  {statusField.fields.map((field) => (
                    <label
                      className="flex w-full cursor-pointer
          justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                    >
                      {field.value.charAt(0).toUpperCase() +
                      field.value.slice(1)}
                      <label
                        className="inline-flex size-5 cursor-pointer rounded-sm
          border-2 border-gray-400 hover:border-gray-200
          has-[:checked]:border-primary has-[:checked]:bg-primary"
                      >
                        <input
                          type="checkbox"
                          name={field.group}
                          value={field.value}
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span className="checkmark w-full"></span>
                      </label>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div
              onClick={() => setStatusFieldOpen(!statusFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
            >
              <span className="font-medium text-white">Status</span>
              <Icon.DropDown className="size-[1.5rem] fill-white" />
            </div>
          </div>
          <div className="filters relative flex cursor-pointer rounded-lg bg-gray-900">
            {speciesFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
          bg-gray-900 py-4"
              >
                <div className="flex flex-col">
                  {specieField.fields.map((field) => (
                    <label
                      className="flex w-full cursor-pointer
          justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                    >
                      {field.value.charAt(0).toUpperCase() +
                      field.value.slice(1)}
                      <label
                        className="inline-flex size-5 cursor-pointer rounded-sm
          border-2 border-gray-400 hover:border-gray-200
          has-[:checked]:border-primary has-[:checked]:bg-primary"
                      >
                        <input
                          type="checkbox"
                          name={field.group}
                          value={field.value}
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span className="checkmark w-full"></span>
                      </label>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div
              onClick={() => setSpeciesFieldOpen(!speciesFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
            >
              <span className="font-medium text-white">Species</span>
              <Icon.DropDown className="size-[1.5rem] fill-white" />
            </div>
          </div>
          <div className="filters relative flex cursor-pointer rounded-lg bg-gray-900">
            {genderFieldOpen && (
              <div
                className="absolute inset-x-0 top-[112%] z-3 w-full rounded-lg
          bg-gray-900 py-4"
              >
                <div className="flex flex-col">
                  {genderField.fields.map((field) => (
                    <label
                      className="flex w-full cursor-pointer
          justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
                    >
                      {field.value.charAt(0).toUpperCase() +
                      field.value.slice(1)}
                      <label
                        className="inline-flex size-5 cursor-pointer rounded-sm
          border-2 border-gray-400 hover:border-gray-200
          has-[:checked]:border-primary has-[:checked]:bg-primary"
                      >
                        <input
                          type="checkbox"
                          name={field.group}
                          value={field.value}
                          checked={
                            searchParams.get(field.group) === field.value
                          }
                          onChange={() =>
                            handleFilters(field.group, field.value)
                          }
                        />
                        <span className="checkmark w-full"></span>
                      </label>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <div
              onClick={() => setGenderFieldOpen(!genderFieldOpen)}
              className="flex w-full items-center justify-between px-4 py-2"
            >
              <span className="font-medium text-white">Gender</span>
              <Icon.DropDown className="size-[1.5rem] fill-white" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
