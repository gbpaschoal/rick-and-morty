export interface ResultCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "Unknown";
  species: string;
  type: string;
  gender: "Male" | "Female" | "Genderless" | "unknown";
  image: string;
  episode: string[];
  firstEpisode: {
    name: string;
    episode: string;
  };
}
