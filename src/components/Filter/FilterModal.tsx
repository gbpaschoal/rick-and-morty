import React from 'react';
import FilterModalField from './FilterModalField';
import FilterModalInput from './FilterModalInput';
import { useSearchParams } from 'react-router-dom';

export default function FilterModal() {
  const [searchParams, setSearchParams] = useSearchParams({});
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
      className="absolute z-3 bottom-[120%] right-[25px] w-[300px]
      rounded-[10px]
       bg-gray-700">
      <div className="py-4">
        <div className="flex h-[350px] flex-col gap-y-4 overflow-scroll">
          <FilterModalField field="status">
            {filterFields.map((field, key) => {
              if (field.group === 'status') {
                return (
                  <FilterModalInput
                    key={key}
                    field={field}
                    handleFilters={handleFilters}
                  />
                );
              }
            })}
          </FilterModalField>
          <FilterModalField field="species">
            {filterFields.map((field, key) => {
              if (field.group === 'species') {
                return (
                  <FilterModalInput
                    key={key}
                    field={field}
                    handleFilters={handleFilters}
                  />
                );
              }
            })}
          </FilterModalField>
          <FilterModalField field="gender">
            {filterFields.map((field, key) => {
              if (field.group === 'gender') {
                return (
                  <FilterModalInput
                    key={key}
                    field={field}
                    handleFilters={handleFilters}
                  />
                );
              }
            })}
          </FilterModalField>
        </div>
      </div>
    </div>
  );
}
