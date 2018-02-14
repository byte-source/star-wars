import { connect } from "react-redux";
import Search from './search';
import * as searchActions from './searchActions';

const mapStateToProps = state => {
  return {
    title: state.search.title,
    searchTerm: state.search.searchTerm,
    planets: state.search.planets,
    fetching: state.search.fetching,
    userName: state.login.loggedInUser.name.toLowerCase(),
    searchCount: state.search.searchCount,
    nextUrl: state.search.nextUrl,
    searchLimitFlag: state.search.searchLimitFlag
  }
}

const mapDispatchToProps = {
  fetchPlanets: searchActions.fetchPlanets,
  increaseSearchCount: searchActions.increaseSearchCount,
  resetSearchCount: searchActions.resetSearchCount,
  searchPlanets: searchActions.searchPlanets,
  fetchMorePlanets: searchActions.fetchMorePlanets,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);