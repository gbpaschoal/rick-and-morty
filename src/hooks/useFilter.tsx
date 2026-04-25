import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useFilter() {
  const filters = {
    status: [
      { group: "status", value: "Alive" },
      { group: "status", value: "Dead" },
      { group: "status", value: "Unknown" },
    ],
    specie: [
      { group: "species", value: "Human" },
      { group: "species", value: "Alien" },
      { group: "species", value: "Mythologic" },
      { group: "species", value: "Animal" },
      { group: "species", value: "Robot" },
      { group: "species", value: "Unknown" },
    ],
    gender: [
      { group: "gender", value: "Male" },
      { group: "gender", value: "Female" },
      { group: "gender", value: "Genderless" },
      { group: "gender", value: "Unknown" },
    ],
  };
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilters = useCallback(
    (group: string, value: string) => {
      const isSelected = searchParams.has(group, value);

      if (isSelected) {
        searchParams.delete(group);
        setSearchParams(searchParams);

        return;
      }

      searchParams.set(group, value);
      setSearchParams(searchParams);
    },
    [searchParams],
  );

  return useMemo(
    () => ({
      filters,
      handleFilters,
    }),
    [searchParams],
  );
}
