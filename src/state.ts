import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_registry.js";
import { PokeAPI, Locations } from "./pokeapi.js";
import { globalLocationCache } from "./cache/pokecache.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: Locations["next"];
  prevLocationsURL: Locations["previous"];
};
export async function initState(): Promise<State> {
  const pokeAPI = new PokeAPI(globalLocationCache);

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Pokedex > `,
    tabSize: 2,
  });

  let nextURL = null;
  let prevURL = null;

  try {
    const data = await pokeAPI.fetchLocations();
  } catch (err) {
    readline.close();
    throw new Error(
      "Failed to initialize state: " +
        (err instanceof Error ? err.message : String(err)),
    );
  }

  return {
    readline: readline,
    commands: getCommands(),
    nextLocationsURL: nextURL,
    prevLocationsURL: prevURL,
    pokeAPI: pokeAPI,
  };
}
