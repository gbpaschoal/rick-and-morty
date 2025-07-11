import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryStore } from "../store/queryStore";

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setQuery } = useQueryStore();
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
      setQuery("");

      return;
    }

    searchParams.set(group, value);
    updateLocalStorage(searchParams.toString());
    setSearchParams(searchParams);
  };

  const statusField = {
    name: "status",
    fields: [
      { group: "status", value: "Alive" },
      { group: "status", value: "Dead" },
      { group: "status", value: "Unknown" },
    ],
  };

  const specieField = {
    name: "Specie",
    fields: [
      { group: "species", value: "Human" },
      { group: "species", value: "Alien" },
      { group: "species", value: "Mythologic" },
      { group: "species", value: "Animal" },
      { group: "species", value: "Robot" },
      { group: "species", value: "Unknown" },
    ],
  };

  const genderField = {
    name: "Gender",
    fields: [
      { group: "gender", value: "Male" },
      { group: "gender", value: "Female" },
      { group: "gender", value: "Genderless" },
      { group: "gender", value: "Unknown" },
    ],
  };

  const fieldState = React.useMemo(
    () => ({
      statusField,
      specieField,
      genderField,
      handleFilters,
    }),
    [searchParams],
  );

  return fieldState;
}
