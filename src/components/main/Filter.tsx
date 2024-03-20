import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function FilterModalInput({
  field: { group, value },
  handleFilters,
}: {
  field: { group: string; value: string };
  handleFilters: (group: string, value: string) => void;
}) {
  const [searchParams] = useSearchParams();

  return (
    <label
      className="w-full motion-opacity flex justify-between
      rounded-[10px] p-3 text-light-200 has-[:checked]:bg-primary-100
      bg-gray-500
      hover:bg-gray-400">
      {value.charAt(0).toUpperCase() + value.slice(1)}
      <input
        type="checkbox"
        name={group}
        value={value}
        checked={searchParams.get(group) === value}
        onChange={() => handleFilters(group, value)}
      />
    </label>
  );
}

function FilterModal({
  handleFilters,
}: {
  handleFilters: (group: string, value: string) => void;
}) {
  const filterFields = [
    { group: 'status', value: 'alive' },
    { group: 'status', value: 'dead' },
    { group: 'status', value: 'unknown' },
    { group: 'species', value: 'human' },
    { group: 'species', value: 'alien' },
    { group: 'species', value: 'mythologic' },
    { group: 'species', value: 'animal' },
    { group: 'species', value: 'robot' },
    { group: 'species', value: 'unknown' },
    { group: 'gender', value: 'male' },
    { group: 'gender', value: 'female' },
    { group: 'gender', value: 'genderless' },
    { group: 'gender', value: 'unknown' },
  ];

  return (
    <div
      className="absolute z-3 top-[120%] w-full max-w-[300px] rounded-[10px]
       bg-gray-700">
      <div className="py-4">
        <div className="flex h-[350px] flex-col gap-y-4 overflow-scroll">
          <div className="flex flex-col gap-y-2 px-4">
            <div className="flex w-full items-center gap-x-2">
              <span
                className="text-[.85rem]
              font-bold text-light-100/70">
                status
              </span>
              <hr className="flex-1" />
            </div>
            <div className="flex flex-col gap-y-2">
              {filterFields.map((field, i) => {
                if (field.group === 'status') {
                  return (
                    <FilterModalInput
                      key={i}
                      field={field}
                      handleFilters={handleFilters}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 px-4">
            <div className="flex w-full items-center gap-x-2">
              <span
                className="text-[.85rem]
              font-bold text-light-100/70">
                species
              </span>
              <hr className="flex-1" />
            </div>
            <div className="flex flex-col gap-y-2">
              {filterFields.map((field, i) => {
                if (field.group === 'species') {
                  return (
                    <FilterModalInput
                      key={i}
                      field={field}
                      handleFilters={handleFilters}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 px-4">
            <div className="flex w-full items-center gap-x-2">
              <span
                className="text-[.85rem]
              font-bold text-light-100/70">
                gender
              </span>
              <hr className="flex-1" />
            </div>
            <div className="flex flex-col gap-y-2">
              {filterFields.map((field, i) => {
                if (field.group === 'gender') {
                  return (
                    <FilterModalInput
                      key={i}
                      field={field}
                      handleFilters={handleFilters}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [isOpen, setIsOpen] = useState(false);

  const convertParamsToArray = () => {
    const params = [];

    for (const value of searchParams.values()) {
      params.push(value);
    }

    return params;
  };
  const handleFilters = (group: string, value: string) => {
    const isSelected = searchParams.has(group, value);
    const updateLocalStorage = (searchParam: string) => {
      searchParam
        ? sessionStorage.setItem('params', searchParam)
        : sessionStorage.clear();
    };

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

  return (
    <div
      className="relative sm:max-w-[80%] order-2 flex w-full gap-4
      lg:order-1">
      <button
        className={`${
          isOpen && 'bg-primary-100'
        } btn motion-opacity w-full rounded-[30px]
        hover:bg-primary-100 text-center text-light-200
        sm:w-max`}
        onClick={() => setIsOpen((prev) => !prev)}>
        Filters
      </button>
      <div
        className="relative hidden
      overflow-x-hidden sm:flex sm:items-center">
        <ul className="flex items-center gap-2 overflow-x-scroll">
          {convertParamsToArray().map((value, i) => {
            return (
              <button
                key={i}
                className="rounded-[40px] px-5 py-3 font-normal
                bg-gray-700 hover:bg-gray-600 text-light-200 motion-opacity">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            );
          })}
        </ul>
      </div>

      {isOpen && <FilterModal handleFilters={handleFilters} />}
    </div>
  );
}
