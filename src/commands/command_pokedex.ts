import { State } from "src/state";

export async function commandPokedex(state: State) {
    console.log('Your Pokedex:')
    for(let pokemon in state.pokedex) {
        console.log(' - ', state.pokedex[pokemon].name)
    }
}