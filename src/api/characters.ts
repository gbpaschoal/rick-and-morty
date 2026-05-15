import axios from "axios";
import { CharactersResponse } from "../types";
import { getEpisode } from "./episodes";

export const API_URL = import.meta.env.VITE_BASE_URL as string;

export const getCharacters = async (url: string) => {
  const { data } = await axios.get<CharactersResponse>(url);

  return data;
};

export const getCharactersByName = async (
  name: string,
): Promise<CharactersResponse> => {
  const { data } = await axios.get<CharactersResponse>(
    `${API_URL}&name=${name}`,
  );
  return data;
};

export const getCharactersWithFirstEpisode = async (url: string) => {
  const characters = await getCharacters(url);

  if (characters.results) {
    await Promise.all(
      characters.results?.map(async (res) => {
        const firstEpisode = await getEpisode(res.episode[0]);
        Object.assign(res, {
          firstEpisode: {
            name: firstEpisode.name,
            episode: firstEpisode.episode,
          },
        });
      }),
    );
  }

  return characters;
};
