import { Episode } from "../types";
import { fetchJson } from "./json";

export const getEpisode = (url: string): Promise<Episode> => {
  return fetchJson<Episode>(url);
};
