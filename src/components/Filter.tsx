import React from "react";
import { Icon } from "../assets/icons/Icon";
import { useSearchParams } from "react-router-dom";

export const FilterContext = React.createContext({});
export function FilterProvider({ children }: { children: React.ReactNode }) {
  return <FilterContext.Provider value={{}}>{children}</FilterContext.Provider>;
}

export function Filter() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      {isOpen && <FilterModal />}
      <button
        className="inline-grid size-14 place-items-center rounded-full bg-white md:size-16"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Icon.Filter className="mx-auto size-[1.5rem] fill-black" />
      </button>
    </>
  );
}

function FilterModalField({ children, field }: any) {
  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full items-center gap-x-2">
        <span className="p-2 text-sm font-medium text-gray-400">
          {field.charAt(0).toUpperCase() + field.slice(1)}
        </span>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FilterModalInput({
  field: { group, value },
  handleFilters,
  checked,
}: {
  field: { group: string; value: string };
  handleFilters: (group: string, value: string) => void;
  checked: boolean;
}) {
  return (
    <label
      className="flex w-full cursor-pointer
      justify-between rounded-lg p-2 font-medium text-gray-200"
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
      <label
        className="inline-flex size-5 cursor-pointer border-1
      border-gray-200 has-[:checked]:border-primary
      has-[:checked]:bg-primary"
      >
        <input
          type="checkbox"
          name={group}
          value={value}
          checked={checked}
          onChange={() => handleFilters(group, value)}
        />
        <span className="checkmark w-full"></span>
      </label>
    </label>
  );
}

export function FilterModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateLocalStorage = (searchParam: string) => {
    searchParam
      ? sessionStorage.setItem("params", searchParam)
      : sessionStorage.clear();
  };
  const handleFilters = (group: string, value: string) => {
    const isSelected = searchParams.has(group, value);

    if (isSelected) {
      searchParams.delete(group);
      updateLocalStorage(searchParams.toString());
      setSearchParams(searchParams);

      return;
    }

    searchParams.set(group, value);
    updateLocalStorage(searchParams.toString());
    setSearchParams(searchParams);
  };

  const filterFields = [
    {
      name: "status",
      data: [
        { group: "status", value: "alive" },
        { group: "status", value: "dead" },
        { group: "status", value: "unknown" },
      ],
    },
    {
      name: "Specie",
      data: [
        { group: "species", value: "human" },
        { group: "species", value: "alien" },
        { group: "species", value: "mythologic" },
        { group: "species", value: "animal" },
        { group: "species", value: "robot" },
        { group: "species", value: "unknown" },
      ],
    },
    {
      name: "Gender",
      data: [
        { group: "gender", value: "male" },
        { group: "gender", value: "female" },
        { group: "gender", value: "genderless" },
        { group: "gender", value: "unknown" },
      ],
    },
  ];

  return (
    <div
      className="absolute bottom-[90%] right-4 z-3 w-[200px] rounded-lg
        bg-gray-800 py-4 xs:w-[300px]"
    >
      <div className="flex h-[500px] flex-col gap-y-4 overflow-y-scroll">
        {filterFields.map((field, index) => {
          return (
            <FilterModalField key={index} field={field.name}>
              {field.data.map((item, index) => {
                return (
                  <FilterModalInput
                    key={index}
                    field={item}
                    handleFilters={handleFilters}
                    checked={searchParams.get(item.group) === item.value}
                  />
                );
              })}
            </FilterModalField>
          );
        })}
      </div>
    </div>
  );
}
