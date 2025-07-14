const {
  serviceSearch,
  serviceAdd,
  serviceList,
  serviceDelete,
  serviceHelp,
} = require("../services/contactService");

const commandAdd = () => {};
const commandList = () => {
  serviceList();
};
const commandSearch = () => {};
const commandDelete = () => {};
const commandHelp = () => {
  serviceHelp();
};

module.exports = {
  commandAdd,
  commandList,
  commandSearch,
  commandDelete,
  commandHelp,
};
