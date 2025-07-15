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
  } catch (err) {
    throw new Error("✗ Error: cannot write to the file");
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

    return {
      status: true,
      message: `✓ Contact added: ${newContact.name}`,
      savedMessage: `✓ Contacts saved to ${fileName}`,
    };
  } catch (err) {
    return { status: false, savedMessage: err.message };
  }
};

const deleteFromJSON = (email) => {
  loadData();
  try {
    const contactToDelete = contacts.find((contact) => contact.email === email);

    if (!contactToDelete) {
      throw new Error(`✗ Error: No contact found with email: ${email}`);
    }

    contacts = contacts.filter((contact) => contact.email !== email);

    writeContactsToFile();

    return {
      status: true,
      message: `✓ Contact deleted: ${contactToDelete.name}`,
      savedMessage: `✓ Contacts saved to ${fileName}`,
    };
  } catch (err) {
    return { status: false, savedMessage: err.message };
  }
};

const listJSON = () => {
  loadData();
  console.log("\n=== All Contacts ===");
  printContactList(contacts);
  //TODO: remove printContactList to serviceSearch
  //printContactList must return am array to serviceSearch
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
    throw new Error(`No contacts found matching "${param}"`);
  } else {
    printContactList(contactToFind);
    //TODO: remove printContactList logic to serviceSearch
    //printContactList must return an array to serviceSearch
  }
};

module.exports = {
  saveIntoJSON,
  deleteFromJSON,
  listJSON,
  searchInJSON,
};
