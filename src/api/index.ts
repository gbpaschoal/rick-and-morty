import type { CharactersResponse, Episode } from "../types";
import { ApiError } from "./error";

export const API_URL = import.meta.env.VITE_API_BASE_URL as string;

export const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError({
      endpoint: url,
      statusCode: res.status,
    });
  }

  return res.json();
};

export const getCharacters = (url: string) =>
  fetchJson<CharactersResponse>(url);

export const getEpisode = (url: string) => fetchJson<Episode>(url);

export const getCharactersByName = (name: string) => {
  const url = `${API_URL}&name=${name}`;
  return fetchJson<CharactersResponse>(url);
};

export const getCharactersWithFirstEpisode = async (
  url: string,
): Promise<CharactersResponse> => {
  const characters = await getCharacters(url);

  //MELHOR ALTERNATIVA?

  await Promise.all(
    characters.results.map(async (res) => {
      const firstEpisode = await getEpisode(res.episode[0]);

      Object.assign(res, {
        firstEpisode: {
          name: firstEpisode.name,
          episode: firstEpisode.episode,
        },
      });
    }),
  );

  return characters;
};
