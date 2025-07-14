const {
  commandAdd,
  commandList,
  commandSearch,
  commandDelete,
  commandHelp,
} = require("./commands/commandHandler");

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    const name = args[1];
    const email = args[2];
    const telephone = args[3];
    commandAdd(name, email, telephone);
    break;

  case "list":
    commandList();
    break;

  case "search":
    const searchTerm = args[1];
    commandSearch(searchTerm);
    break;

  case "delete":
    const emailToDelete = args[1];
    commandDelete(emailToDelete);
    break;

  case "help":
    commandHelp();
    break;

  default:
    console.log(`✗ Error: Unknown command "${command}"`);
}
