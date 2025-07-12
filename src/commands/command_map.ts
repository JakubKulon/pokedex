import { Locations } from "src/pokeapi.js";
import { State } from "../state";

export async function commandMap(state: State) {
  try {
    const locationsResponse = await state.pokeAPI.fetchLocations<Locations>(
      state.nextLocationsURL || undefined,
    );
    state.nextLocationsURL = locationsResponse.next;
    state.prevLocationsURL = locationsResponse.previous;
    console.log("\n");
    for (let location of locationsResponse.results) {
      console.log(location.name);
    }
    state.readline.prompt();
  } catch (err) {
    console.log(err);
    state.readline.close();
  }
}
