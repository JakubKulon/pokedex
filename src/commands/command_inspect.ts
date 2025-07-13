import { State } from "src/state";

export async function commandInspect(state: State, ...args: string[]) {
    const pokemonName = args[0]

    const pokemonData = state.pokedex[pokemonName]
    if(!pokemonData) {
        console.log('you have not caught that pokemon')
    }

    const {base_experience, height, name, stats, types, weight} = pokemonData
    console.log(`Name: ${name}`)
    console.log(`Height: ${height}`)
    console.log(`Weight: ${weight}`)
    console.log(`Stats: `)
    stats.map(stat => console.log(` -${stat.stat.name}: ${stat.base_stat} `))
    console.log('Types:')
    types.map(type => console.log(` - ${type.type.name}`))
}