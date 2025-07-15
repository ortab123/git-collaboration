const {
  serviceSearch,
  serviceAdd,
  serviceList,
  serviceDelete,
  serviceHelp,
} = require("../services/contactService");

const commandAdd = (name, email, telephone) => {
  serviceAdd(name, email, telephone);
};

const commandList = () => {
  serviceList();
  //TODO: add error message
};

const commandSearch = (searchTerm) => {
  serviceSearch(searchTerm);
  //TODO: add error message
};

const commandDelete = (emailToDelete) => {
  if (emailToDelete) {
    serviceDelete(emailToDelete);
  } else {
    console.error(`✗ Error: Missing arguments for delete command`);
  }
};

const commandHelp = () => {
  serviceHelp();
};

const commandHandlerFunction = (command, args) => {
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
};

module.exports = {
  commandHandlerFunction,
};
