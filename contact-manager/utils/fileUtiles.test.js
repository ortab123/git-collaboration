const { saveIntoJSON, deleteFromJSON, listJSON, searchInJSON, loadData, writeContactsToFile, setContacts, printContactList } = require("./fileUtiles")
const fs = require("fs")
const path = require("path")

jest.mock("fs")

const dummyContacts = [
  { name: "John", email: "john@example.com", telephone: "555-123-4567" },
  { name: "Jane", email: "jane@example.com", telephone: "555-123-4567" },
]

describe("fileUtiles tests", () => {
  beforeEach(() => jest.clearAllMocks())

  test("should log and do nothing if file doesn't exist", () => {
    fs.existsSync.mockReturnValue(false)

    console.log = jest.fn()

    loadData()

    expect(console.log).toHaveBeenCalledWith("✗ File not found - creating new contact list")
  })

  test("should read and parse data if file exists", () => {
    const dummyData = [{ name: "John", email: "john@example.com", telephone: "555-1234" }]

    fs.existsSync.mockReturnValue(true)
    fs.readFileSync.mockReturnValue(JSON.stringify(dummyData))
    console.log = jest.fn()

    loadData()

    expect(fs.readFileSync).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith(`✓ Loaded ${dummyData.length} contacts`)
  })

  test("should log error if JSON is invalid", () => {
    fs.existsSync.mockReturnValue(true)
    fs.readFileSync.mockReturnValue("invalid JSON")
    console.error = jest.fn()

    loadData()

    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("✗ Error reading or parsing file"), expect.any(String))
  })

  test("should add contacts to json file", () => {
    setContacts(dummyContacts)

    const expectedPath = path.join(__dirname, "contacts.json")
    const expectedData = JSON.stringify(dummyContacts, null, 2)

    writeContactsToFile()

    expect(fs.writeFileSync).toHaveBeenCalledWith(expectedPath, expectedData, "utf8")
  })

  test("should throw an error if writing to file fails", () => {
    setContacts(dummyContacts)

    fs.writeFileSync.mockImplementation(() => {
      throw new Error("Simulated write error")
    })

    expect(() => writeContactsToFile()).toThrow("✗ Error: cannot write to the file")
  })

  test("should return arr with contacts", () => {
    const expectedOutput = ["1. John - john@example.com - 555-123-4567", "2. Jane - jane@example.com - 555-123-4567"]

    expect(printContactList(dummyContacts)).toEqual(expectedOutput)
  })

  test("should save new contact and return success message", () => {
    const newContact = {
      name: "Max",
      email: "max@example.com",
      telephone: "555-123-321",
    }

    setContacts([])
    fs.writeFileSync.mockImplementation(() => {})

    const result = saveIntoJSON(newContact)

    expect(result.status).toBe(true)
    expect(result.message).toContain("✓ Contact added")
    expect(result.savedMessage).toContain("✓ Contacts saved to")
  })

  test("should return error if contact with email already exists", () => {
    const newContact = {
      name: "John",
      email: "john@example.com",
      telephone: "555-1234",
    }

    setContacts([newContact])

    const result = saveIntoJSON(newContact)

    expect(result.status).toBe(false)
    expect(result.savedMessage).toBe("✗ Error: Contact with this email already exists")
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })

  test("should return error if writing to file fails", () => {
    const newContact = {
      name: "Jane",
      email: "jane@example.com",
      telephone: "555-5678",
    }

    setContacts([])

    fs.writeFileSync.mockImplementation(() => {
      throw new Error("Disk is full")
    })

    const result = saveIntoJSON(newContact)

    expect(result.status).toBe(false)
    expect(result.savedMessage).toBe("Disk is full")
  })

  test("should delete contact and return success message", () => {
    const email = "jane@example.com"

    setContacts(dummyContacts)
    fs.writeFileSync.mockImplementation(() => {})

    const result = deleteFromJSON(email)

    expect(result.status).toBeTruthy()
    expect(result.message).toContain("✓ Contact deleted")
    expect(result.savedMessage).toContain("✓ Contacts saved to")
  })

  test("should return error if contant not exists", () => {
    const email = "test@example.com"

    setContacts(dummyContacts)
    fs.writeFileSync.mockImplementation(() => {})

    const result = deleteFromJSON(email)
    expect(result.status).toBeFalsy()
    expect(result.savedMessage).toContain("✗ Error: No contact found with email")
  })

  test("should return list of all contacts", () => {
    const expectedOutput = ["1. John - john@example.com - 555-123-4567", "2. Jane - jane@example.com - 555-123-4567"]

    expect(listJSON(dummyContacts).status).toBeTruthy()
    expect(listJSON(dummyContacts).message).toEqual(expectedOutput)
  })

  test("should return contact from contacts list by email", () => {
    setContacts(dummyContacts)

    const email = "john@example.com"
    const expectedOutput = "1. John - john@example.com - 555-123-4567"

    const result = searchInJSON(email)
    expect(result.status).toBeTruthy()
    expect(result.message).toContain(expectedOutput)
  })

  test("should return no contact if name does not exist in the list", () => {
    setContacts(dummyContacts)

    const name = "test"
    const result = searchInJSON(name)

    expect(result.status).toBeFalsy()
    expect(result.message).toContain("No contacts found matching ")
  })
})
