import { AUTH_NAME, AUTH_TOKEN } from './constants';

export const loggedUser = () => localStorage.getItem(AUTH_NAME);

export const isLogged = () => loggedUser() !== null;

export const saveUserData = (token, name) => {
  localStorage.setItem(AUTH_TOKEN, token);
  localStorage.setItem(AUTH_NAME, name);
};

export const cleanLoggedUser = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(AUTH_NAME);
};

export const shortTitle = content => {
  let ret = content.split('\n')[0];
  if (ret.length >= 30) {
    ret = `${ret.substring(0, 30)}...`;
  }
  return ret;
};
