import axios from 'axios';
import config from '../common/config';
import * as Actions from './searchActionTypes';

const search = (planetName) => axios.get(config.planetsUrl + planetName);
const searchNext = (url) => axios.get(url);

let innerTimeBound = new Date();
let firstSearch = false;
const searchConfig = config;

export const doSearch = (planetName) => {

  return (dispatch, getState) => {
    const currentUser = getState().login.loggedInUser.name.toLowerCase();
    let searchCount = getState().search.searchCount;
    if (currentUser === searchConfig.allowedUser.toLowerCase()) {
      dispatch(fetchPlanets(planetName));
    }
    else {
      let currentTime, time;
      // Resetting the inner time bound on the very first search
      if (!firstSearch) {
        innerTimeBound = new Date();
        firstSearch = true;
      }
      currentTime = new Date();

      time = (currentTime - innerTimeBound) / 1000; //time in seconds
      // Case of restricted search limit to other users
      if (time > searchConfig.timeLimit) {
        dispatch(resetSearchCount());
        /* It means that its more been more than the time limit since the last search, so reset everything  */
        time = 0;
        searchCount = 0;
        innerTimeBound = new Date();
        dispatch(fetchPlanets(planetName));
      } else {
        /* search happening in the time limit */
        if (searchCount < searchConfig.searchLimit) {
          //we've not reached the search limit yet
          dispatch(fetchPlanets(planetName));
        } else {
          //we've reached the search limit in the time limit frame
          dispatch(searchLimitFlag(true));
        }
      }
    }
  }
}

export const fetchPlanets = (planetName) => {

  return (dispatch) => {
    dispatch(setSearchTerm(planetName));
    dispatch(fetching(true));
    dispatch(increaseSearchCount());
    dispatch(searchLimitFlag(false));
    search(planetName)
      .then((response) => {
        dispatch(setNextPlanetsUrl(response.data.next));
        dispatch(setAllPlanets(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchingFailed(error));
      })
      .then(() => {
        dispatch(fetching(false));
      })
  }
}
export const fetchMorePlanets = (url) => {

  return (dispatch) => {
    searchNext(url)
      .then((response) => {
        dispatch(setNextPlanetsUrl(response.data.next));
        dispatch(appendNextPlanets(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchingFailed(error));
      })
      .then(() => {
        dispatch(fetching(false));
      })
  }
}

export const setSearchTerm = (value) => ({
  type: Actions.SET_SEARCH_TERM,
  payload: value
});

export const setAllPlanets = (value) => ({
  type: Actions.SET_ALL_PLANETS,
  payload: value
});
export const searchLimitFlag = (value) => ({
  type: Actions.SET_SEARCH_LIMIT_FLAG,
  payload: value
});

export const fetching = (flag) => ({
  type: Actions.FETCHING,
  payload: flag
})

export const fetchingFailed = (error) => ({
  type: Actions.FETCHING_FAILED,
  payload: error
})

export const increaseSearchCount = () => ({
  type: Actions.INCREASE_SEARCH_COUNT
});

export const resetSearchCount = () => ({
  type: Actions.RESET_SEARCH_COUNT
});

export const setNextPlanetsUrl = (url) => ({
  type: Actions.SET_NEXT_URL,
  payload: url
});

export const appendNextPlanets = (nextPlanets) => ({
  type: Actions.APPEND_NEXT_PLANETS,
  payload: nextPlanets
});

export const searchPlanets = (searchValue) => ({
  type: Actions.SEARCH_PLANETS,
  payload: searchValue,
  searchPromise: search
})

export const resetSearchState = () => ({
  type: Actions.RESET_SEARCH_STATE
})

