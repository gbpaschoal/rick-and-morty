import React from "react";
import { useSearchParams } from "react-router-dom";

export function useFilter() {
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

  const statusField = {
    name: "status",
    fields: [
      { group: "status", value: "alive" },
      { group: "status", value: "dead" },
      { group: "status", value: "unknown" },
    ],
  };

  const specieField = {
    name: "Specie",
    fields: [
      { group: "species", value: "human" },
      { group: "species", value: "alien" },
      { group: "species", value: "mythologic" },
      { group: "species", value: "animal" },
      { group: "species", value: "robot" },
      { group: "species", value: "unknown" },
    ],
  };

  const genderField = {
    name: "Gender",
    fields: [
      { group: "gender", value: "male" },
      { group: "gender", value: "female" },
      { group: "gender", value: "genderless" },
      { group: "gender", value: "unknown" },
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
