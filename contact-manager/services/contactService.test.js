const { serviceAdd, serviceDelete, serviceSearch, serviceList, serviceHelp } = require("./contactService")

const validation = require("../utils/validation")
const fileUtils = require("../utils/fileUtiles")

jest.mock("../utils/validation")
jest.mock("../utils/fileUtiles")

describe("contactService", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, "log").mockImplementation(() => {})
  })

  test("should add a contact and log success messages", () => {
    validation.nameValidation.mockReturnValue(true)
    validation.emailValidation.mockReturnValue(true)
    validation.phoneValidation.mockReturnValue(true)

    fileUtils.saveIntoJSON.mockReturnValue({
      status: true,
      message: "✓ Contact added: John Doe",
      savedMessage: "✓ Contacts saved to contacts.json",
    })

    fileUtils.saveIntoJSON.mockReturnValue({
      status: true,
      message: "✓ Contact added: John Doe",
      savedMessage: "✓ Contacts saved to contacts.json",
    })

    serviceAdd("John Doe", "john@example.com", "555-1234")

    expect(fileUtils.saveIntoJSON).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      telephone: "555-1234",
    })

    expect(console.log).toHaveBeenCalledWith("✓ Contact added: John Doe")
    expect(console.log).toHaveBeenCalledWith("✓ Contacts saved to contacts.json")
  })

  test("should not add a contact", () => {
    validation.nameValidation.mockReturnValue(true)
    validation.emailValidation.mockReturnValue(false)
    validation.phoneValidation.mockReturnValue(true)

    serviceAdd("John Doe", "example.com", "555-1234")

    expect(fileUtils.saveIntoJSON).not.toHaveBeenCalledWith({
      name: "John Doe",
      email: "example.com",
      telephone: "555-1234",
    })
  })

  test("should not add a contact with email that already exists", () => {
    validation.nameValidation.mockReturnValue(true)
    validation.emailValidation.mockReturnValue(true)
    validation.phoneValidation.mockReturnValue(true)

    fileUtils.saveIntoJSON.mockReturnValue({
      status: false,
      savedMessage: "✗ Error: Contact with this email already exists",
    })

    serviceAdd("John Doe", "john@example.com", "555-1234")

    expect(fileUtils.saveIntoJSON).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
      telephone: "555-1234",
    })

    expect(console.log).toHaveBeenCalledWith("✗ Error: Contact with this email already exists")
  })

  test("should delete a contact and log success messages", () => {
    validation.emailValidation.mockReturnValue(true)

    fileUtils.deleteFromJSON.mockReturnValue({
      status: true,
      message: "✓ Contact deleted: John Doe",
      savedMessage: "✓ Contacts saved to contacts.json",
    })

    serviceDelete("john@example.com")

    expect(fileUtils.deleteFromJSON).toHaveBeenCalledWith("john@example.com")

    expect(console.log).toHaveBeenCalledWith("✓ Contact deleted: John Doe")
    expect(console.log).toHaveBeenCalledWith("✓ Contacts saved to contacts.json")
  })

  test("should not delete a contact and log error messages", () => {
    validation.emailValidation.mockReturnValue(true)

    fileUtils.deleteFromJSON.mockReturnValue({
      status: false,
      message: "✓ Contact deleted: John Doe",
      savedMessage: "✗ Error: No contact found with email: john@example.com",
    })

    serviceDelete("john@example.com")

    expect(fileUtils.deleteFromJSON).toHaveBeenCalledWith("john@example.com")

    expect(console.log).toHaveBeenCalledWith("✗ Error: No contact found with email: john@example.com")
  })

    test("should list all contacts and log them", () => {
    const fakeContacts = [
      "1. John Doe - john@example.com - 555-1234",
      "2. Jane Smith - jane@example.com - 555-5678",
    ];

    fileUtils.listJSON.mockReturnValue({
      status: true,
      message: fakeContacts,
    });

    serviceList();

    expect(console.log).toHaveBeenCalledWith("\n=== All Contacts ===");
    expect(console.log).toHaveBeenCalledWith(fakeContacts[0]);
    expect(console.log).toHaveBeenCalledWith(fakeContacts[1]);
  });

  test("should print error if contact list is empty", () => {
    fileUtils.listJSON.mockReturnValue({
      status: false,
      message: [],
    });

    serviceList();

    expect(console.log).toHaveBeenCalledWith("\n=== All Contacts ===");
    expect(console.log).toHaveBeenCalledWith("✗ Error: contact list empty");
  });

  test("should search and find matching contact(s)", () => {
    const query = "john";
    const results = [
      "1. John Doe - john@example.com - 555-1234",
      "2. Johnny Depp - johnny@example.com - 555-0000",
    ];

    fileUtils.searchInJSON.mockReturnValue({
      status: true,
      message: results,
    });

    serviceSearch(query);

    expect(console.log).toHaveBeenCalledWith(`\n=== Search Results for "${query}" ===`);
    expect(console.log).toHaveBeenCalledWith(results[0]);
    expect(console.log).toHaveBeenCalledWith(results[1]);
  });

  test("should handle no search results found", () => {
    const query = "bob";

    fileUtils.searchInJSON.mockReturnValue({
      status: false,
      message: `No contacts found matching "${query}"`,
    });

    serviceSearch(query);

    expect(console.log).toHaveBeenCalledWith(`\n=== Search Results for "${query}" ===`);
    expect(console.log).toHaveBeenCalledWith(`No contacts found matching "${query}"`);
  });

  test("should handle empty search query", () => {
    serviceSearch("");
    expect(console.log).toHaveBeenCalledWith("✗ Error: invalid search query");
  });
})
