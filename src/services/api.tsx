import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api/character';

export const getAllCharacters = async (url: string, signal?: AbortSignal) => {
  if (signal) {
    try {
      const { data } = await axios.get(BASE_URL + url, { signal });
      return data;
    } catch (error) {
      console.log(error);
    }
    return;
  }
  const { data } = await axios.get(BASE_URL + url, { signal });
  return data;
};

export const getOneCharacter = async (url: string, signal?: AbortSignal) => {
  if (signal) {
    const { data } = await axios.get(BASE_URL + url);
    return data;
  }
  const { data } = await axios.get(BASE_URL + url, { signal });
  return data;
};
