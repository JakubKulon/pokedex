import { State } from "../state";

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    console.log(`you're on the first page`, "\n");
    state.readline.prompt();
    return;
  }
  try {
    const locationsResponse = await state.pokeAPI.fetchLocations(
      state.prevLocationsURL,
    );
    state.prevLocationsURL = locationsResponse.previous;
    for (let location of locationsResponse.results) {
      console.log(location.name);
    }
    state.readline.prompt();
  } catch (err) {
    console.log(err);
    state.readline.close();
  }
}
