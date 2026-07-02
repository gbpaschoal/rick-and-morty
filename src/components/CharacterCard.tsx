import { useQuery } from "@tanstack/react-query";
import type { Character } from "../types";
import { FavoriteButton } from "./Favorites";
import { CloseIcon } from "./ui/icons";

function CharacterCardSkeleton() {
  return (
    <div>
      <div className="aspect-square w-full bg-gray-700" />

      <div className="space-y-3 p-2">
        <div className="h-6 w-2/3 rounded bg-gray-700" />
        <div className="h-4 w-1/3 rounded bg-gray-700" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-1/2 rounded bg-gray-700" />

          <div className="h-4 w-3/4 rounded bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

function CharacterCardError() {
  return (
    <div>
      <div className="aspect-square w-full bg-gray-700">
        <div className="size-full grid place-items-center">
          <CloseIcon className="size-62 fill-gray-600" />
        </div>
      </div>

      <div className="space-y-3 p-2">
        <div className="h-6 w-2/3 rounded bg-gray-700" />

        <div className="h-4 w-1/3 rounded bg-gray-700" />

        <div className="space-y-2 pt-2">
          <div className="h-4 w-1/2 rounded bg-gray-700" />

          <div className="h-4 w-3/4 rounded bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function CharacterCard({ character }: { character: Character }) {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["image", character.image],
    queryFn: async () => {
      const res = await fetch(character.image);

      if (!res.ok) {
        throw new Error("failed");
      }

      const blob = await res.blob();

      return URL.createObjectURL(blob);
    },
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div
      className="group h-full rounded-md
        bg-gray-900 pb-4"
    >
      {isLoading || isFetching ? (
        <CharacterCardSkeleton />
      ) : isError ? (
        <CharacterCardError />
      ) : (
        data && (
          <>
            <div className="relative overflow-hidden rounded-t-md">
              <div className="absolute inset-0">
                <div
                  className="relative flex justify-end top-0 p-1 transition-all duration-300
            lg:-top-full lg:group-hover:top-0"
                >
                  <FavoriteButton character={character} />
                </div>
              </div>
              <img
                src={data}
                alt={character.name}
                className="aspect-square w-full object-cover transition-all"
              />
            </div>
            <div className="overflow-hidden p-2">
              <h2 className="text-lg font-semibold text-gray-100 md:text-xl ">
                {character.name}
              </h2>
              <span className="block pb-3 text-gray-200">
                {character.species}
              </span>
              <span className="text-gray-300">
                First seen in:&nbsp;
                <span className="font-semibold text-gray-200">
                  {character.firstEpisode ? (
                    character.firstEpisode.name
                  ) : (
                    <span className="font-semibold text-gray-500">
                      Not Found
                    </span>
                  )}
                </span>
              </span>
            </div>
          </>
        )
      )}
    </div>
  );
}
