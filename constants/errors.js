const errors = {
  AUTH_FAILED: {
    code: 403,
    message: "Authentication Failed",
  },
  INVALID_TOKEN: {
    code: 403,
    message: "Bad token",
  },
  NO_TOKEN: {
    code: 403,
    message: "Bad token",
  },

  NOT_FOUND: {
    code: 400,
    message: "Entity not found.",
  },
  USER_NOT_EXISTS: {
    code: 100,
    message: "User doesn't exist.",
  },
  USEREMAIL_EXISTS: {
    code: 400,
    message: "This email isn’t available. Please try again…",
  },
  USERNAME_EXISTS: {
    code: 400,
    message: "This username isn’t available. Please try again…",
  },
  EMAIL_REQUIRED: {
    code: 400,
    message: "Email is required.",
  },
  INVALID_PASSWORD_LENGTH: {
    code: 400,
    message: "Password should be of at least 8 characters.",
  },
  INVALID_CREDENTIALS: {
    code: 101,
    message: "Invalid credentials",
  },
  SERVER_ERROR: {
    code: 500,
    message: "Internal server error",
  },

  TOPIC_EXISTS: {
    code: 109,
    message: "This topic already exists.",
  },

  CITATION_EXISTS: {
    code: 110,
    message: "This citation url already exists.",
  },
};

module.exports = errors;
