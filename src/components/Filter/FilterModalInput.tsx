import { useSearchParams } from 'react-router-dom';

export default function FilterModalInput({
  field: { group, value },
  handleFilters,
}: {
  field: { group: string; value: string };
  handleFilters: (group: string, value: string) => void;
}) {
  const [searchParams] = useSearchParams();

  return (
    <label
      className="w-full flex justify-between
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
