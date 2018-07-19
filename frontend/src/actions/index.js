export const NOTIFICATION_CLEAN = 'NOTIFICATION_CLEAN';
export const NOTIFICATION_SHOW = 'NOTIFICATION_SHOW';

export const ACCOUNT_SIGNIN = 'ACCOUNT_SIGNIN';
export const ACCOUNT_SIGNOUT = 'ACCOUNT_SIGNOUT';
export const ACCOUNT_SIGNUP = 'ACCOUNT_SIGNUP';
export const ACCOUNT_AUTH_SUCESSFUL = 'ACCOUNT_AUTH_SUCESSFUL';

const createAction = type => payload => ({ type, payload });

export default {
  cleanNotification: createAction(NOTIFICATION_CLEAN),
  showNotification: createAction(NOTIFICATION_SHOW),
  signInAccount: createAction(ACCOUNT_SIGNIN),
  signOutAccount: createAction(ACCOUNT_SIGNOUT),
  signUpAccount: createAction(ACCOUNT_SIGNUP),
  authSucessfulAccount: createAction(ACCOUNT_AUTH_SUCESSFUL)
};
