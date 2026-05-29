import { CharactersResponse } from "../types";
import { getEpisode } from "./episodes";
import { fetchJson } from "./json";

export const API_URL = import.meta.env.VITE_BASE_URL as string;

export const getCharacters = (url: string): Promise<CharactersResponse> => {
  return fetchJson<CharactersResponse>(url);
};

export const getCharactersByName = (
  name: string,
): Promise<CharactersResponse> => {
  const url = `${API_URL}&name=${name}`;
  return fetchJson<CharactersResponse>(url);
};

export const getCharactersWithFirstEpisode = async (
  url: string,
): Promise<CharactersResponse> => {
  const characters = await getCharacters(url);

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
