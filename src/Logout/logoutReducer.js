const INITIAL_STATE = {
  loggingOut: false
}

const logoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGGING_OUT':
      state = Object.assign({}, state, { loggingOut: true });
      break;
    case 'CLEAR_USER_DATA':
      state = Object.assign({}, state, { login: {} });
      break
    case 'LOG_OUT_COMPLETE':
      break;
  }
  return state;
}

export default logoutReducer;