import * as Actions from "./searchActionTypes";

let user = {};
if (typeof (Storage) !== "undefined" && sessionStorage.length) {
  user = JSON.parse(sessionStorage.getItem("user"));
}

const INITIAL_STATE = {
  planets: [],
  searchTerm: '',
  fetching: false,
  searchCount: 0,
  fetchError: false,
  userName: null,
  nextUrl: null,
  searchLimitFlag: false
}

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_ALL_PLANETS:
      state = Object.assign({}, state, {
        planets: action.payload,
        fetchError: false
      });
      break;
    case Actions.INCREASE_SEARCH_COUNT:
      state = Object.assign({}, state, { searchCount: ++state.searchCount });
      break;
    case Actions.RESET_SEARCH_COUNT:
      state = Object.assign({}, state, { searchCount: 0 });
      break;

    case Actions.SET_SEARCH_TERM:
      state = Object.assign({}, state, { searchTerm: action.payload });
      break;

    case Actions.FETCHING_FAILED:
      state = Object.assign({}, state, { fetchError: true });
      break;

    case Actions.SET_NEXT_URL:
      state = Object.assign({}, state, { nextUrl: action.payload });
      break;

    case Actions.APPEND_NEXT_PLANETS:
      const totalPlanets = state.planets.concat(action.payload)
      state = Object.assign({}, state, { planets: totalPlanets });
      break;

    case Actions.FETCHING:
      state = Object.assign({}, state, { fetching: action.payload });
      break;

    case Actions.SET_SEARCH_LIMIT_FLAG:
      state = Object.assign({}, state, { searchLimitFlag: action.payload });
      break;

    case Actions.RESET_SEARCH_STATE:
      state = Object.assign({}, state, INITIAL_STATE);
      break;
  }

  return state;
}

export default searchReducer;