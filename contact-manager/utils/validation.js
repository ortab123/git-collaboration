const nameValidation = (name) => {
  const nameParts = name.trim().split(/\s+/);

  if (nameParts.length < 2 || nameParts.length > 3) {
    console.error(
      "Name must include at least first and last name, and maximum three words"
    );

    return false;
  }

  const nameRegex = /^[A-Za-z]+$/;

  for (const part of nameParts) {
    if (!nameRegex.test(part)) {
      console.error(
        "Invalid name. Each part of the name must contain only letters."
      );
      return false;
    }
  }

  return true;
};

const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    console.error("Email must contain @ symbol and valid format");
    return false;
  }

  return true;
};

const phoneValidation = (telephone) => {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  if (!phoneRegex.test(telephone)) {
    console.error('Phone must be in the format "555-123-4567"');
    return false;
  }

  return true;
};

module.exports = {
  nameValidation,
  emailValidation,
  phoneValidation,
};
