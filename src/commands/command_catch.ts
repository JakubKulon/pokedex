import { POKE_API_ENDPOINT_POKEMON } from "../pokeapi.js";
import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  try {
    const pokemonData = await state.pokeAPI.fetchPokemon(pokemonName);

    const { base_experience, name, height, weight } = pokemonData;
    console.log(`Throwing a Pokeball at ${name}...`);
    const rollResult = Math.random() * base_experience;
    if (rollResult > base_experience / 2) {
      console.log(`${name} was caught!`);
      state.pokedex[name] = { base_experience, height, name, weight };
    } else {
      console.log(`${name} escaped!`);
      return;
    }
  } catch (err) {
    console.log(err);
    state.readline.close();
  }
}
