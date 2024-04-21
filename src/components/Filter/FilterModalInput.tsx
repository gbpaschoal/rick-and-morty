export default function FilterModalInput({
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
      rounded-[10px] p-3 text-light-200 has-[:checked]:bg-primary-100
      bg-gray-500
      hover:bg-gray-400">
      {value.charAt(0).toUpperCase() + value.slice(1)}
      <input
        type="checkbox"
        name={group}
        value={value}
        checked={checked}
        onChange={() => handleFilters(group, value)}
      />
    </label>
  );
}
