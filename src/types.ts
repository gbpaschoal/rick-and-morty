export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Info<T> {
  //MUDAR?
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T;
}

export interface Character extends ResourceBase {
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: CharacterLocation;
  location: CharacterLocation;
  image: string;
  episode: string[];

  firstEpisode?: Episode;
}

export type CharactersResponse = Info<Character[]>;

export interface CharacterLocation {
  name: string;
  url: string;
}

export interface Episode extends ResourceBase {
  air_date: string;
  episode: string;
  characters: string[];
}
