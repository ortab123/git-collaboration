const {
  nameValidation,
  emailValidation,
  phoneValidation,
} = require("./validation.js");

//PhoneValidation
test("phoneValidation make sure the phone number is in the correct format", () => {
  const phone = "050-925-5548";
  const bool = phoneValidation(phone);
  expect(bool).toBeTruthy();
});

test("phoneValidation returns false and logs an error for invalid phone format", () => {
  const missingDashPhone = "050-9255548";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = phoneValidation(missingDashPhone);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    'Phone must be in the format "555-123-4567"'
  );

  consoleSpy.mockRestore();
});

test("phoneValidation fails when phone number is too short", () => {
  const shortPhone = "123-456-789";

  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = phoneValidation(shortPhone);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    'Phone must be in the format "555-123-4567"'
  );

  consoleSpy.mockRestore();
});

//EmailValidation

test("emailValidation make sure the email is in the correct format", () => {
  const email = "ortk2025@gmail.com";
  const bool = emailValidation(email);
  expect(bool).toBeTruthy();
});

test("emailValidation should return false and logs an error for invalid email format", () => {
  const missingAtSign = "ortk2025gmailcom";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = emailValidation(missingAtSign);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Email must contain @ symbol and valid format"
  );

  consoleSpy.mockRestore();
});

//NameTest
test("nameValidation make sure the name is in the correct format", () => {
  const name = "The Zohan";
  const bool = nameValidation(name);
  expect(bool).toBeTruthy();
});

test("nameValidation should return false and log an error for invalid name format", () => {
  const invalidName = "";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = nameValidation(invalidName);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Name must include at least first and last name, and maximum three words"
  );

  consoleSpy.mockRestore();
});

test("nameValidation should return false and log an error for invalid name format", () => {
  const invalidName = "Zohan";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = nameValidation(invalidName);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Name must include at least first and last name, and maximum three words"
  );

  consoleSpy.mockRestore();
});

test("nameValidation should return false and log an error for invalid name format", () => {
  const invalidName = "The Zohan Fizzi Bobalah";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = nameValidation(invalidName);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Name must include at least first and last name, and maximum three words"
  );

  consoleSpy.mockRestore();
});

test("nameValidation should return false and log an error for invalid name format", () => {
  const invalidName = "#The $Zohan!";
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const bool = nameValidation(invalidName);

  expect(bool).toBeFalsy();
  expect(consoleSpy).toHaveBeenCalledWith(
    "Invalid name. Each part of the name must contain only letters."
  );

  consoleSpy.mockRestore();
});
