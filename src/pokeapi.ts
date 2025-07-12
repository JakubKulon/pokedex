import { Cache } from "./cache/pokecache.js";

export const POKE_API_ENDPOINT = "https://pokeapi.co/api/v2";
export const POKE_API_ENDPOINT_AREA_LOCATION = `${POKE_API_ENDPOINT}/location-area`;
export const POKE_API_ENDPOINT_POKEMON = `${POKE_API_ENDPOINT}/pokemon`;

export class PokeAPI {
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations<T>(pageURL?: string): Promise<T> {
    if (!pageURL) {
      pageURL = POKE_API_ENDPOINT_AREA_LOCATION;
    }

    const cachedURL = this.#cache.get<T>(pageURL);

    if (cachedURL) {
      return cachedURL;
    }

    try {
      const response = await fetch(pageURL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();

      this.#cache.add(pageURL, data);

      return data;
    } catch (err) {
      throw new Error(
        "Failed to fetch location data: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const fetchURL = `${POKE_API_ENDPOINT_POKEMON}/${name}`;

    const cachedURL = this.#cache.get<Pokemon>(fetchURL);

    if (cachedURL) {
      return cachedURL;
    }

    try {
      const response = await fetch(fetchURL);

      const data = await response.json();

      this.#cache.add(fetchURL, data);

      return data;
    } catch (err) {
      throw new Error(
        "Failed to fetch pokemon data: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }
}

export type Locations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type LocationsDetails = {
  pokemon_encounters: { pokemon: { name: string; url: string } }[];
};

export type Pokemon = {
  base_experience: number;
  height: number;
  weight: number;
  name: string;
};
