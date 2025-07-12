import {
  LocationsDetails,
  POKE_API_ENDPOINT_AREA_LOCATION,
} from "../pokeapi.js";
import { State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  try {
    console.log(`Exploring ${args}...`);
    const locationsResponse =
      await state.pokeAPI.fetchLocations<LocationsDetails>(
        `${POKE_API_ENDPOINT_AREA_LOCATION}/${args}`,
      );
    const pokemonsInArea = locationsResponse.pokemon_encounters;
    console.log("Found Pokemon:");
    for (let pokemonEncouter of pokemonsInArea) {
      console.log(` - ${pokemonEncouter.pokemon.name}`);
    }
  } catch (err) {
    console.log(err);
    state.readline.close();
  }
}
