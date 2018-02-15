import { doSearch } from "./searchActions";
import config from '../common/config';

const planetSearchMiddleWare = (store) => (next) => (action) => {

  if (action.type === 'SEARCH_PLANETS') {
    next(doSearch(action.payload));
  } else {
    next(action);
  }
}

export default planetSearchMiddleWare;
