import { commandCatch } from "./commands/command_catch.js";
import { commandExit } from "./commands/command_exit.js";
import { commandExplore } from "./commands/command_explore.js";
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
    explore: {
      name: "explore",
      description: "Explore area",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Caught pokemon!",
      callback: commandCatch,
    },
    // can add more commands here
  };
}
