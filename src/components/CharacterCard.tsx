import { useQuery } from "@tanstack/react-query";
import { Character } from "../types";
import { FavoriteButton } from "./Favorites";

function useImage(url: string) {
  return useQuery({
    queryKey: ["image", url],

    queryFn: async () => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("failed");
      }

      const blob = await res.blob();

      return URL.createObjectURL(blob);
    },
  });
}

export function CharacterCard({ character }: { character: Character }) {
  const { data } = useImage(character.image);

  if (!data) return null;

  return (
    <div
      className="group flex h-full w-full flex-col rounded-md
        bg-gray-900 pb-4"
    >
      <div className="relative inset-0 overflow-hidden rounded-t-md">
        <div className="absolute inset-0">
          <div className="flex h-full flex-col justify-start">
            <div
              className="relative top-0 w-full p-1 transition-all duration-300
            lg:-top-full lg:group-hover:top-0"
            >
              <FavoriteButton character={character} />
            </div>
          </div>
        </div>
        <img
          src={data}
          alt={character.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="overflow-hidden p-2">
        <h2 className="text-lg font-semibold text-gray-100 md:text-xl ">
          {character.name}
        </h2>
        <span className="block pb-3 text-gray-200">{character.species}</span>
        <span className="text-gray-300">
          First seen in:&nbsp;
          <span className="font-semibold text-gray-200">
            {character.firstEpisode ? (
              character.firstEpisode.name
            ) : (
              <span className="font-semibold text-gray-500">Not Found</span>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
