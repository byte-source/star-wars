import { connect } from "react-redux";
import Search from './search';
import * as SearchActions from './Actions';

const mapStateToProps = state => {
  return {
    title: state.search.title,
    searchTerm: state.search.searchTerm,
    planets: state.search.planets,
    fetching: state.search.fetching,
    userName: state.login.loggedInUser.name.toLowerCase(),
    searchCount: state.search.searchCount,
    nextUrl: state.search.nextUrl
  }
}

const mapDispatchToProps = {
  fetchPlanets: SearchActions.fetchPlanets,
  increaseSearchCount: SearchActions.increaseSearchCount,
  resetSearchCount: SearchActions.resetSearchCount,
  fetchMorePlanets: SearchActions.fetchMorePlanets
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);