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
  const results = [];

  list.forEach((contact, index) => {
    results.push(
      `${index + 1}. ${contact.name} - ${contact.email} - ${contact.telephone}`
    );
  });

  return results;
};

const saveIntoJSON = (newContact) => {
  loadData();

  try {
    if (contacts.find((contact) => contact.email === newContact.email)) {
      throw new Error("✗ Error: Contact with this email already exists");
    }
    contacts.push(newContact);
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
  const allContacts = printContactList(contacts);
  return { status: true, message: allContacts };
};

const searchInJSON = (param) => {
  loadData();
  const searchParam = param.toLowerCase();

  const contactToFind = contacts.filter(
    (contact) =>
      contact.email.toLowerCase().includes(searchParam) ||
      contact.name.toLowerCase().includes(searchParam)
  );

  try {
    if (contactToFind.length === 0) {
      throw new Error(`No contacts found matching "${param}"`);
    } else {
      const finded = printContactList(contactToFind);
      return { status: true, message: finded };
    }
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const setContacts = (newContacts) => {
  contacts = newContacts;
};

module.exports = {
  saveIntoJSON,
  deleteFromJSON,
  listJSON,
  searchInJSON,
  loadData,
  writeContactsToFile,
  setContacts,
  printContactList
};
