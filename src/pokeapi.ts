import { Cache } from "./pokecache";

const cache = new Cache(5000);

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  #cache: Cache;

  constructor(cache: Cache) {
    this.#cache = cache;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (!pageURL) {
      pageURL = `${PokeAPI.baseURL}/location-area`;
    }

    try {
      const response = await fetch(pageURL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }

      this.#cache.add(pageURL, {
        createdAt: Date.now(),
        val: await response.json(),
      });

      return response.json();
    } catch (err) {
      throw new Error(
        "Failed to fetch data: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    try {
      const response = await fetch(
        `${PokeAPI.baseURL}/location/${locationName}`,
      );
      if (!response.ok) {
        throw new Error(
          `Network response was not ok for single location! ${locationName}`,
        );
      }
      return response.json();
    } catch (err) {
      throw new Error(
        "Failed to fetch data: " +
          (err instanceof Error ? err.message : String(err)),
      );
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  region: {
    name: string;
    url: string;
  };
  names: [
    {
      name: string;
      language: {
        name: string;
        url: string;
      };
    },
  ];
  game_indices: [
    {
      game_index: number;
      generation: {
        name: string;
        url: string;
      };
    },
  ];
  areas: [
    {
      name: string;
      url: string;
    },
  ];
};
