import { Cache } from "./cache/pokecache.js";

export const POKE_API_ENDPOINT = "https://pokeapi.co/api/v2/location-area";

export class PokeAPI {
  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations<T>(pageURL?: string): Promise<T> {
    if (!pageURL) {
      pageURL = POKE_API_ENDPOINT;
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
        "Failed to fetch data: " +
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
