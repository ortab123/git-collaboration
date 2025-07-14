const nameValidation = (name) => {
  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length < 2 || nameParts.length > 3) {
    throw new Error(
      "Name must include at least first and last name, and maximum three words"
    );
  }

  const nameRegex = /^[A-Za-z]+$/;

  for (const part of nameParts) {
    if (!nameRegex.test(part)) {
      throw new Error(
        "Invalid name. Each part of the name must contain only letters."
      );
    }
  }

  return true;
};

const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new Error("Email must contain @ symbol and valid format");
  }

  return true;
};

const phoneValidation = (number) => {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (!phoneRegex.test(phone)) {
    throw new Error('Phone must be in the format "555-123-4567"');
  }

  return true;
};

module.exports = {
  nameValidation,
  emailValidation,
  phoneValidation,
};
