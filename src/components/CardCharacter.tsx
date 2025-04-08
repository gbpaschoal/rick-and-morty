import { ICharacter } from '../types/Characters';

export default function CardCharacter({ data }: { data: ICharacter }) {
  return (
    <>
      <div className="w-full bg-[var(--dark-100)] rounded-xl flex flex-col gap-y-2
       pb-8 p-2 hover:bg-[var(--dark-200)]">
        <div className="relative overflow-hidden rounded-xl cursor-pointer">
          <div className="absolute inset-0 opacity-100">
            <div className="flex flex-col justify-end h-full p-2">
              {/* <ButtonFavorite data={data} /> */}
              <div
                className="relative overflow-y-scroll
                w-full left-0 transition-position
                 delay-500 ease-linear">
              </div>
            </div>
          </div>
          <img src={data.image} alt={data.name} className="object-cover" />
        </div>
        <div className="h-14 overflow-hidden">
          <h2
            className="font-extrabold text-2xl w-full line-clamp-1">
            {data.name}
          </h2>
          <span className="text-base">{data.species}</span>
        </div>
      </div>
    </>
  );
}
