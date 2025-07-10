import { cleanInput } from "./repl.js";
import { getCommands } from "./command_registry.js";
import { initState } from "./state.js";

async function main() {
  const rl = await initState();

  rl.readline.prompt();

  rl.readline.on("line", (input) => {
    if (!input) {
      rl.readline.prompt();
    }
    const output = cleanInput(input);
    const commands = getCommands();
    if (commands[output[0]]) {
      commands[output[0]].callback(rl);
    } else {
      console.log("unknown command");
    }
    rl.readline.prompt();
  });
}

main();
