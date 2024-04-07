type FilterModalFieldProps = {
  children: React.ReactNode;
  field: string;
};

export default function FilterModalField({
  children,
  field,
}: FilterModalFieldProps) {
  return (
    <div className="flex flex-col gap-y-2 px-4">
      <div className="flex w-full items-center gap-x-2">
        <span
          className="text-[.85rem]
              font-bold text-light-100/70">
          {field}
        </span>
        <hr className="flex-1" />
      </div>
      <div className="flex flex-col gap-y-2">{children}</div>
    </div>
  );
}
