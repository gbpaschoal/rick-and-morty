import axios from "axios";
import { CharactersResponse, Episode } from "../types";

const API_URL = import.meta.env.VITE_BASE_URL as string;

// TODO: Add try error
export const getCharactersByURL = async (url: string) => {
  const { data } = await axios.get<CharactersResponse>(url);

  return data;
};

export const getAllCharacters = async (): Promise<CharactersResponse> => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getCharactersByParams = async (
  // TODO: Type params
  params: string,
): Promise<CharactersResponse> => {
  const { data } = await axios.get(`${API_URL}&${params}`);
  return data;
};

export const getEpisodeByURL = async (episodeUrl: string) => {
  const { data: episode } = await axios.get<Episode>(episodeUrl);

  return episode;
};
