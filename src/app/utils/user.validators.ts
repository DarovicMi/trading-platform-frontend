export const UserValidators = {
  USERNAME_MIN_LENGTH: 8,
  USERNAME_MAX_LENGTH: 24,

  EMAIL_MIN_LENGTH: 1,
  EMAIL_MAX_LENGTH: 255,

  PASSWORD_PATTERN:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,16}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 16,

  PHONE_PATTERN: /^\+?(\d{11,12})$/,
};
