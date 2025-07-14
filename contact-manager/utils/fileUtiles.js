const fs = require("fs");
const path = require("path");

const fileName = "contacts.json";
const filePath = path.join(__dirname, fileName);

let contacts = [];

const loadData = () => {
  console.log(`Loading contacts from ${fileName}...`);

  if (!fs.existsSync(filePath)) {
    console.log("✗ File not found - creating new contact list");
  } else {
    try {
      const fileData = fs.readFileSync(filePath, "utf8");
      contacts = JSON.parse(fileData);

      console.log(`✓ Loaded ${contacts.length} contacts`);
    } catch (err) {
      console.error("✗ Error reading or parsing file", err.message);
      return;
    }
  }
};

const writeContactsToFile = () => {
  try {
    const jsonData = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
    console.log(`✓ Contacts saved to ${fileName}`);
  } catch (err) {
    console.error("✗ Error: cannot write to the file");
  }
};

const printContactList = (list) => {
  list.forEach((contact, index) => {
    console.log(
      `${index + 1}. ${contact.name} - ${contact.email} - ${contact.telephone}`
    );
  });
};

const saveIntoJSON = (newContact) => {
  loadData();

  contacts.push(newContact);

  try {
    const jsonData = JSON.stringify(contacts, null, 2);

    fs.writeFileSync(filePath, jsonData, "utf8");

    console.log(`✓ Contact added: ${newContact.name}`);
    console.log(`✓ Contacts saved to ${fileName}`);
  } catch (err) {
    console.error("✗ Error: cannot write to the file");
  }
};

const deleteFromJSON = (email) => {
  loadData();

  const contactToDelete = contacts.find((contact) => contact.email === email);

  if (!contactToDelete) {
    console.log(`✗ Error: No contact found with email: ${email}`);
    return;
  }

  contacts = contacts.filter((contact) => contact.email !== email);

  console.log(`✓ Contact deleted: ${contactToDelete.name}`);
  writeContactsToFile();
};

const listJSON = () => {
  loadData();
  console.log("\n=== All Contacts ===");
  printContactList(contacts);
};

const searchInJSON = (param) => {
  loadData();
  const searchParam = param.toLowerCase();

  const contactToFind = contacts.filter(
    (contact) =>
      contact.email === param ||
      contact.name.toLowerCase().includes(searchParam)
  );

  console.log(`\n=== Search Results for "${param}" ===`);

  if (contactToFind.length === 0) {
    console.log(`No contacts found matching "${param}"`);
  } else {
    printContactList(contactToFind);
  }
};

module.exports = {
  saveIntoJSON,
  deleteFromJSON,
  listJSON,
  searchInJSON,
};
