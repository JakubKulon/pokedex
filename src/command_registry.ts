import { commandExit } from "./commands/command_exit.js";
import { commandHelp } from "./commands/command_help.js";
import { commandMap } from "./commands/command_map.js";
import { commandMapBack } from "./commands/command_mapback.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Show 20 location",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Show previous 20 location",
      callback: commandMapBack,
    },
    // can add more commands here
  };
}
