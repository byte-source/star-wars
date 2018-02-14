import * as Actions from './loginActionTypes';

export const loginSuccess = (payload) => (
  {
    type: Actions.LOGIN_SUCCESS,
    payload: payload
  }
);

export const setUserData = (userData) => ({
  type: Actions.SET_USER_DATA,
  payload: userData
});

export const loginFail = () => ({
  type: Actions.LOGIN_FAIL
});

export const loading = () => ({
  type: Actions.LOADING
});

export const loaded = () => ({
  type: Actions.LOADED
});

export const clearLoginDetails = () => ({
  type: Actions.CLEAR_LOGIN_DETAILS
});
