import { combineReducers } from 'redux';
import formReducer, { loginReducer } from './Login/loginReducer';
import searchReducer from './Search/searchReducer';
import logoutReducer from './Logout/logoutReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  form: formReducer,
  search: searchReducer,
  logout: logoutReducer
});


export const appReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return rootReducer(state, action)
}
export default rootReducer;