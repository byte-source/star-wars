export const loginSuccess = (payload) => (
  {
    type: 'LOGIN_SUCCESS',
    payload: payload
  }
);

export const setUserData = (userData) => ({
  type: 'SET_USER_DATA',
  payload: userData
});

export const loginFail = () => ({
  type: 'LOGIN_FAIL'
});

export const loading = () => ({
  type: 'LOADING'
});

export const loaded = () => ({
  type: 'LOADED'
});
