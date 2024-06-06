export class Validation {
  static readonly login = {
    requiredEmail: 'Email is required.',
    invalidEmail: 'Please enter a valid email address.',
    requiredPassword: 'Password is required.',
    invalidPassword:
      'Invalid password. It must be at least between 8 and 16 characters',
    successLogin: 'You have successfully logged into your account!',
    errorLogin: 'Invalid Credentials',
    logout: 'You have successfully logged out!',
    failLogout: 'Logout failed!',
    loginStatusFail: 'Failed to get login status!',
  };

  static readonly signUp = {
    requiredUsername: 'Username is required.',
    invalidUsername: 'Username must be between 8 and 24 characters.',
    requiredEmail: 'Email is required.',
    invalidEmail: 'Please enter a valid email address.',
    requiredPassword: 'Password is required.',
    invalidPassword:
      'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    requiredConfirmPassword: 'Please confirm your password.',
    passwordMismatch: 'Passwords do not match.',
    successSignup:
      'Your account has been created. An email was sent to you to activate it, please check your inbox!',
    errorSignup:
      'An error happend while creating your account, please try again later!',
    requiredFirstName: 'First Name is a required field.',
    requiredLastName: 'Last Name is a required field.',
    requiredCountry: 'Country is a required field.',
    invalidCountry: 'Invalid country, please enter a valid country.',
    requiredPhoneNumber: 'Phone Number is a required field.',
    invalidPhoneNumber: 'Invalid phone number format.',
    requiredTerms:
      'You must agree to our terms and conditions by checking the box.',
  };

  static readonly profile = {
    requiredFirstName: 'First name is required.',
    invalidFirstName: 'First name must be between 2 and 32 characters.',
    requiredLastName: 'Last name is required.',
    invalidLastName: 'Last name must be between 2 and 32 characters.',
    requiredCountry: 'Country is required.',
    invalidCountry: 'Please enter a valid country name.',
    requiredPhoneNumber: 'Phone number is required.',
    invalidPhoneNumber: 'Please enter a valid phone number.',
    failToGetProfile: 'Failed to get user profile',
    failToUpdateProfile: 'Failed to update profile, please try again!',
    failToDeleteProfile: 'Failed to delete profile, please try again!',
    failToChangePassword: 'Failed to change password, please try again!',
  };

  static readonly common = {
    requiredField: 'This field is required.',
    invalidFormat: 'Invalid format.',
    minLength: (min: number) => `Minimum length is ${min} characters.`,
    maxLength: (max: number) => `Maximum length is ${max} characters.`,
  };
  static readonly email = {
    reissueTokenNotExpired:
      "Expiration token hasn't expired yet or your account is already active",
    errorActivation:
      'An error has happend while trying to activate your account, please try again later!',
    successActivation:
      'Your account is active, you will be redirected to login',
    errorPasswordReset:
      'The email provided does not exist, please provide an email with a registered user and try again',
  };
  static readonly coin = {
    failedToFetchCoin: 'Failed to get data for coin',
    failedToFetchMarketData: 'Failed to get market data',
    failedToUpdateMarketData: 'Failed to update market data',
    failedToUpdateCoins: 'Failed to update coins',
    failedToFetchCoins: 'Failed to get coins',
    buyCoinError:
      'Oops, looks like there was an error with your transaction, please try again!',
    buyOrSellCoinSuccess: 'Your transaction was successful!',
    invalidAmount: 'Invalid amount entered',
    notEnoughFundsError: 'Not enough funds to complete the transaction!',
    fetchPortfolioError: 'Error - Could not fetch portfolio, please try again!',
  };
}
