import { createInterface, type Interface } from "readline";
import { getCommands } from "./command_registry.js";
import { PokeAPI, ShallowLocations } from "./pokeapi.js";
export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: ShallowLocations["next"];
  prevLocationsURL: ShallowLocations["previous"];
};
export async function initState(): Promise<State> {
  const pokeAPI = new PokeAPI();

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `Pokedex > `,
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
