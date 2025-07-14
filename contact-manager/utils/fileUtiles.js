const fs = require("fs")
const path = require("path")

const fileName = "contacts.json"
const filePath = path.join(__dirname, fileName)



const saveIntoJSON = (newContact) => {
  console.log(`Loading contacts from ${fileName}...`)
  let contacts = []

  if (!fs.existsSync(filePath)) {
    console.log("✗ File not found - creating new contact list")
  } else {
    try {
      const fileData = fs.readFileSync(filePath, "utf8")
      contacts = JSON.parse(fileData)

      console.log(`✓ Loaded ${contacts.length} contacts`)
    } catch (err) {
      console.error("✗ Error reading or parsing file", err.message)
      return
    }
  }

  contacts.push(newContact)

  try {
    const jsonData = JSON.stringify(contacts, null, 2)

    fs.writeFileSync(filePath, jsonData, "utf8")

    console.log(`✓ Contact added: ${newContact.name}`)
    console.log(`✓ Contacts saved to ${fileName}`)
  } catch (err) {
    console.error("✗ Error: cannot write to the file")
  }
}

// const testData = {
//   name: "Zinger",
//   email: 30,
//   telephone: "555-1234",
// }

// saveIntoJSON(testData)


//const deleteFromJSON = () => {}

//const listJSON = () => {}

//const searchInJSON = () => {}

module.exports = {
  saveIntoJSON,
}
