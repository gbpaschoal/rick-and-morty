import React from 'react';
import { useSearchParams } from 'react-router-dom';

function FilterModalField({
  children,
  field,
}: any) {
  return (
    <div className="flex flex-col px-4">
      <div className="flex w-full items-center gap-x-2">
        <span
          className="text-sm font-medium text-[var(--light-300)]  p-2">
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
      className="w-full flex justify-between
      rounded-lg p-2 text-[var(--light)] font-medium cursor-pointer">
      {value.charAt(0).toUpperCase() + value.slice(1)}
      <label className="inline-flex cursor-pointer size-5 border-1
      border-[var(--dark-500)] has-[:checked]:bg-[var(--primary)]
      has-[:checked]:border-[var(--primary)]">
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

export default function FilterModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const updateLocalStorage = (searchParam: string) => {
    searchParam
      ? sessionStorage.setItem('params', searchParam)
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
    { name: "status",
      data: [
      { group: 'status', value: 'alive' },
      { group: 'status', value: 'dead' },
      { group: 'status', value: 'unknown' },
    ]},
    { name: "Specie",
      data: [
      { group: 'species', value: 'human' },
      { group: 'species', value: 'alien' },
      { group: 'species', value: 'mythologic' },
      { group: 'species', value: 'animal' },
      { group: 'species', value: 'robot' },
      { group: 'species', value: 'unknown' },
    ]},
    { name: "Gender",
      data: [
      { group: 'gender', value: 'male' },
      { group: 'gender', value: 'female' },
      { group: 'gender', value: 'genderless' },
      { group: 'gender', value: 'unknown' },
    ]},
  ];

  return (
      <div
        className="absolute z-3 bottom-[90%] right-[25px] w-[300px]
        rounded-lg bg-[var(--dark-200)] py-4">
        <div className="flex h-[500px] flex-col gap-y-4 overflow-y-scroll">
          {filterFields.map(field => {
            return (
              <FilterModalField field={field.name}>
                {field.data.map((item, index) => {
                  return (
                    <FilterModalInput
                    key={index}
                    field={item}
                    handleFilters={handleFilters}
                    checked={searchParams.get(item.group) === item.value}/>
                    )})}
              </FilterModalField>
            )})}
        </div>
      </div>
  );
}
