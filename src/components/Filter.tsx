import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilter } from "../hooks/useFilter";
import {
  RiEqualizerLine as FilterIcon,
  RiCloseLine as CloseIcon,
  RiArrowDownSLine as DropDownIcon,
} from "@remixicon/react";
import clsx from "clsx";

function DropDownButton({
  isDropDownOpen,
  toggle,
}: {
  isDropDownOpen: boolean;
  toggle: () => void;
}) {
  const [searchParams] = useSearchParams();

  const paramsToArray = [...searchParams].length;
  return (
    <button
      onClick={toggle}
      className={clsx(
        "relative flex cursor-pointer gap-x-2 rounded-4xl px-4 py-2 text-gray-100 hover:bg-gray-800",
        isDropDownOpen ? "bg-gray-800" : "bg-gray-900",
      )}
      aria-label="Apply filters"
    >
      {paramsToArray > 0 && (
        <div className="absolute top-[-20%] right-[-6%]">
          <span className="grid place-items-center  w-6 aspect-square text-[.812rem] font-bold rounded-full bg-primary">
            {paramsToArray}
          </span>
        </div>
      )}
      <FilterIcon size={18} className="mt-px fill-gray-100 transition-all" />
      Filter
    </button>
  );
}

function DropDown() {
  const [statusFieldOpen, setStatusFieldOpen] = useState(false);
  const [speciesFieldOpen, setSpeciesFieldOpen] = useState(false);
  const [genderFieldOpen, setGenderFieldOpen] = useState(false);

  const { filters } = useFilter();

  useEffect(() => {
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
    <div className="grid w-full gap-2 md:grid-cols-3">
      <DropDownItem
        field="Status"
        filters={filters.status}
        isOpen={statusFieldOpen}
        toggle={() => setStatusFieldOpen((prev) => !prev)}
      />
      <DropDownItem
        field="Species"
        filters={filters.specie}
        isOpen={speciesFieldOpen}
        toggle={() => setSpeciesFieldOpen((prev) => !prev)}
      />
      <DropDownItem
        field="Gender"
        filters={filters.gender}
        isOpen={genderFieldOpen}
        toggle={() => setGenderFieldOpen((prev) => !prev)}
      />
    </div>
  );
}

function DropDownItem({
  field,
  filters,
  isOpen,
  toggle,
}: {
  field: string;
  filters: any;
  isOpen: boolean;
  toggle: () => void;
}) {
  const [searchParams] = useSearchParams();
  const { handleFilters } = useFilter();

  return (
    <div className="filters relative">
      {isOpen && (
        <div
          className="absolute inset-x-0 top-[112%] z-3 rounded-lg
                  bg-gray-900 py-4"
          role="group"
          aria-label="Status Filters"
        >
          <ul className="flex flex-col">
            {filters.map((field) => {
              const id = `${field.group}-${field.value}`;
              return (
                <li key={id} className="">
                  <CheckBoxOption
                    option={field}
                    id={id}
                    isChecked={searchParams.get(field.group) === field.value}
                    update={() => handleFilters(field.group, field.value)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between px-4 py-2
              cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-800 transition-all"
        aria-label="Status"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-100">{field}</span>
        <DropDownIcon
          size={20}
          className={clsx(
            "fill-gray-100 transition-all",
            isOpen ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
    </div>
  );
}

function CheckBoxOption({
  option,
  id,
  isChecked,
  update,
}: {
  option: any;
  isChecked: boolean;
  id: string;
  update: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="check-input flex w-full cursor-pointer
                        justify-between px-4 py-2 font-medium text-gray-200 hover:bg-gray-800"
    >
      {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
      <input
        type="checkbox"
        id={id}
        name={option.group}
        value={option.value}
        className="peer sr-only"
        checked={isChecked}
        onChange={update}
      />
      <span
        className="relative inline-flex size-5 cursor-pointer rounded-xs
                              border-2 border-gray-400 hover:border-gray-200
                              peer-checked:border-primary peer-checked:bg-primary"
      ></span>
    </label>
  );
}

export function Filter() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex justify-end">
        <DropDownButton
          isDropDownOpen={filterOpen}
          toggle={() => {
            setFilterOpen((prev) => !prev);
          }}
        />
      </div>
      {filterOpen && <DropDown />}
    </div>
  );
}
