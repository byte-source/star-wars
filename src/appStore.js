import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import planetSearchMiddleWare from './search/searchMiddleware'

const middleware = applyMiddleware(thunk, planetSearchMiddleWare);
const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

export default store;