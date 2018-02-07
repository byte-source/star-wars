import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk);
const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

export default store;