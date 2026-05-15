import axios from "axios";
import { Episode } from "../types";

export const getEpisode = async (url: string) => {
  const { data } = await axios.get<Episode>(url);

  return data;
};
