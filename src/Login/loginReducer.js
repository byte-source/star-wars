import { reducer as formReducer } from 'redux-form';

let user = {};
if (typeof (Storage) !== "undefined" && sessionStorage.length) {
  user = JSON.parse(sessionStorage.getItem("user"));
}
const INITIAL_STATE = {
  loggedIn: user.loggedIn || false,
  loggedInUser: user.details,
  loading: false
}
export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      state = Object.assign({}, state, { loggedIn: true });
      break;

    case 'SET_USER_DATA':
      state = Object.assign({}, state, { loggedInUser: action.payload });
      break;

    case 'LOADING':
      state = Object.assign({}, state, { loading: true });
      break;

    case 'LOADED':
      state = Object.assign({}, state, { loading: false });
      break;

    default:
      return state;
      break;
  }

  return state;
}
export default formReducer;
