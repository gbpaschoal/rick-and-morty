import axios from 'axios';
const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const getAllCharacters = async (
  params: string,
  signal?: AbortSignal
) => {
  if (signal) {
    try {
      const { data } = await axios.get(BASE_URL + params, { signal });
      data.results.forEach((character) => {
        fetch(character.episode[0])
          .then((res) => res.json())
          .then((res) => {
            character.firstEpisode = res.name;
          });
      });
      return data;
    } catch (error) {
      console.log(error);
    }
    return;
  }
  const { data } = await axios.get(BASE_URL + params, { signal });
  return data;
};
