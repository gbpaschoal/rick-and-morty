export interface IResultList {
  info: {
    pages: number;
    count: number;
    next: string;
  };
  results: ICharacter[];
  error?: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "Unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  image: string;
  episode: string[];
  firstEpisode: string;
}
export type AwaitedResult<T> = T extends PromiseLike<infer U> ? U : T;
