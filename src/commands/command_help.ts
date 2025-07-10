import { CLICommand, State } from "../state.js";

export async function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!\n", "Usage:", "\n");
  for (let command in state.commands) {
    console.log(`${command}: ${state.commands[command].description}`);
  }
}
