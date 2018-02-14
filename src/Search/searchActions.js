import axios from 'axios';
import config from '../common/config';
import * as Actions from './searchActionTypes'

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

export const fetchPlanets = (planetName) => {

  return (dispatch) => {
    dispatch(setSearchTerm(planetName));
    dispatch(fetching(true));

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

const search = (planetName) => axios.get(config.planetsUrl + planetName);
const searchNext = (url) => axios.get(url);
