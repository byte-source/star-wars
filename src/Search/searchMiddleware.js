import * as searchActions from "./searchActions";
import config from '../common/config';

let innerTimeBound = new Date();
let firstSearch = false;
const searchConfig = config;
const planetSearchMiddleWare = (store) => (next) => (action) => {

  if (action.type === 'SEARCH_PLANETS') {
    const currentUser = store.getState().login.loggedInUser.name.toLowerCase();


    if (currentUser === searchConfig.allowedUser.toLowerCase()) {
      proceedWithSearch(store, action);
    }
    else {
      let currentTime, time;
      let searchCount = store.getState().search.searchCount;

      // Resetting the inner time bound on the very first search
      if (!firstSearch) {
        innerTimeBound = new Date();
        firstSearch = true;
      }
      currentTime = new Date();

      time = (currentTime - innerTimeBound) / 1000; //time in seconds
      // Case of restricted search limit to other users
      if (time > searchConfig.timeLimit) {
        /* It means that its more been more than the time limit since the last search, so reset everything  */
        time = 0;
        searchCount = 0;
        innerTimeBound = new Date();
        next(searchActions.resetSearchCount());
        next(searchActions.searchLimitFlag(false));
        proceedWithSearch(store, action);
      } else {
        /* search happening in the time limit */
        if (searchCount < searchConfig.searchLimit) {
          //we've not reached the search limit yet
          next(searchActions.searchLimitFlag(false));
          proceedWithSearch(store, action);
        } else {
          //we've reached the search limit in the time limit frame
          next(searchActions.searchLimitFlag(true));
        }
      }
    }

  } else {
    next(action);
  }
}

const proceedWithSearch = (store, action) => {
  store.dispatch(searchActions.increaseSearchCount());
  store.dispatch(searchActions.setSearchTerm(action.payload));
  store.dispatch(searchActions.fetching(true));
  action.searchPromise(action.payload)
    .then((response) => {
      store.dispatch(searchActions.setNextPlanetsUrl(response.data.next));
      return response.data.results;
    })
    .then(planets => {
      store.dispatch(searchActions.setAllPlanets(planets));
      store.dispatch(searchActions.fetching(false));
    })
}
export default planetSearchMiddleWare;