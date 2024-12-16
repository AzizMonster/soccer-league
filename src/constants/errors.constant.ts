const Errors = {
  EXPRESS: {
    NOT_FOUND: {
      code: 1000,
      message: "Route not found",
    },
    UNAUTHORIZED: {
      code: 1001,
      message: "Unauthorized access",
    },
    VALIDATION: {
      code: 1002,
      message: "Validation error",
    },
  },
  USER: {
    NOT_FOUND: {
      code: 2000,
      message: "User not found",
    },
    DUPLICATE_EMAIL: {
      code: 2001,
      message: "Email already exists",
    },
  },
};

export default Errors;
