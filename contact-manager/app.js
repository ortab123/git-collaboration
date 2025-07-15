const {
  commandHandlerFunction,
} = require("./commands/commandHandler");

const args = process.argv.slice(2);
const command = args[0];

commandHandlerFunction(command, args)



