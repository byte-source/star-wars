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
  nextUrl: null
}

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ALL_PLANETS':
      state = Object.assign({}, state, {
        planets: action.payload,
        fetchError: false
      });
      break;
    case 'INCREASE_SEARCH_COUNT':
      state = Object.assign({}, state, { searchCount: ++state.searchCount });
      break;
    case 'RESET_SEARCH_COUNT':
      state = Object.assign({}, state, { searchCount: 0 });
      break;

    case 'SET_SEARCH_TERM':
      state = Object.assign({}, state, { searchTerm: action.payload });
      break;

    case 'FETCHING_FAILED':
      state = Object.assign({}, state, { fetchError: true });
      break;

    case 'SET_NEXT_URL':
      state = Object.assign({}, state, { nextUrl: action.payload });
      break;

    case 'APPEND_NEXT_PLANETS':
      const totalPlanets = state.planets.concat(action.payload)
      state = Object.assign({}, state, { planets: totalPlanets });
      break;

    case 'FETCHING':
      state = Object.assign({}, state, { fetching: action.payload });
      break;
  }

  return state;
}

export default searchReducer;