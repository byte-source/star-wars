import axios from 'axios';
import config from '../common/config';

export const setSearchTerm = (value) => ({
  type: 'SET_SEARCH_TERM',
  payload: value
});

export const setAllPlanets = (value) => ({
  type: 'SET_ALL_PLANETS',
  payload: value
});

export const fetching = (flag) => ({
  type: 'FETCHING',
  payload: flag
})

export const fetchingFailed = (error) => ({
  type: 'FETCHING_FAILED',
  payload: error
})

export const increaseSearchCount = () => ({
  type: 'INCREASE_SEARCH_COUNT'
});

export const resetSearchCount = () => ({
  type: 'RESET_SEARCH_COUNT'
});

export const setNextPlanetsUrl = (url) => ({
  type: 'SET_NEXT_URL',
  payload: url
});

export const appendNextPlanets = (nextPlanets) => ({
  type: 'APPEND_NEXT_PLANETS',
  payload: nextPlanets
});

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
