import { cleanInput } from "./repl.js";
import { getCommands } from "./command_registry.js";
import { initState } from "./state.js";

async function main() {
  const rl = await initState();

  rl.readline.prompt();

  rl.readline.on("line", async (input) => {
    if (!input) {
      rl.readline.prompt();
    }
    const output = cleanInput(input);
    const commands = getCommands();
    if (commands[output[0]]) {
      await commands[output[0]].callback(rl, output[1]);
    } else {
      console.log("unknown command");
    }
    rl.readline.prompt();
  });
}

main();
