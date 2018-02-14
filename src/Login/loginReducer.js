import { reducer as formReducer } from 'redux-form';
import * as Actions from './loginActionTypes';

let user = {};
if (typeof (Storage) !== "undefined" && sessionStorage.length) {
  user = JSON.parse(sessionStorage.getItem("user"));
}
const INITIAL_STATE = {
  loggedIn: user.loggedIn || false,
  loggedInUser: user.details,
  loading: false
}

const RESET_STATE = {
  loggedIn: false,
  loggedInUser: null,
  loading: false
}
export const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      state = Object.assign({}, state, { loggedIn: true });
      break;

    case Actions.SET_USER_DATA:
      state = Object.assign({}, state, { loggedInUser: action.payload });
      break;

    case Actions.LOADING:
      state = Object.assign({}, state, { loading: true });
      break;

    case Actions.LOADED:
      state = Object.assign({}, state, { loading: false });
      break;

    case Actions.CLEAR_LOGIN_DETAILS:
      state = Object.assign({}, state, RESET_STATE);
      break;

    default:
      return state;
      break;
  }

  return state;
}
export default formReducer;
