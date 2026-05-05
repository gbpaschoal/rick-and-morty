import axios from "axios";
import { CharactersResponse } from "../types";

const API_URL = import.meta.env.VITE_BASE_URL as string;

// TODO: Add try error

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
