const {
  nameValidation,
  emailValidation,
  phoneValidation,
} = require("../utils/validation");
const {
  saveIntoJSON,
  deleteFromJSON,
  listJSON,
  searchInJSON,
} = require("../utils/fileUtiles");

function serviceAdd(name, email, telephone) {
  if (
    nameValidation(name) &&
    emailValidation(email) &&
    phoneValidation(telephone)
  ) {
    const contactDetails = {
      name,
      email,
      telephone,
    };
    saveIntoJSON(contactDetails);
  }
}

function serviceDelete(email) {
  if (emailValidation(email)) {
    deleteFromJSON(email);
  } else {
    console.error("✗ Error: Invalid email address. Must contain '@'.");
  }
}

function serviceSearch(query) {
  if (query.trim() === "") {
    console.log("✗ Error: invalid search query");
    return;
  }

  searchInJSON(query.trim());
}

function serviceList() {
  listJSON();
}

function serviceHelp() {
  console.log(`
Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  search "query"              - Search contacts by name or email
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"
  `);
}

module.exports = {
  serviceAdd,
  serviceDelete,
  serviceSearch,
  serviceList,
  serviceHelp,
};
