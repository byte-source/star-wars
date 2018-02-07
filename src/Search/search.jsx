import React, { Component } from 'react';
import Planet from './planet';
import Loader from '../common/loader';
import labels from '../common/labels';
import config from '../common/config';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.renderSearchField = this.renderSearchField.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.makeSearch = this.makeSearch.bind(this);
    this.beginSearch = this.beginSearch.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      fireSetTimeOut: false,
      searchLimitFlag: false,
      innerTimeBound: new Date(),
      searchLimit: labels.searchLimit,
      timeLimit: labels.timeLimit,
      firstSearch: false,
      timeOut: 1000,
      allowedUser: config.allowedUser.toLowerCase()
    }
  }

  searchHandler(event) {
    event.persist();
    clearTimeout(this.state.fireSetTimeOut);
    const value = event.target.value;

    if (this.props.userName === this.state.allowedUser) {
      this.setState({
        fireSetTimeOut: setTimeout(this.makeSearch, this.state.timeOut, value)
      });

    } else {
      const fn = this.beginSearch();
      this.setState({
        fireSetTimeOut: setTimeout(fn, this.state.timeOut, value)
      });
    }
  }

  beginSearch() {

    return (value) => {

      let currentTime, time;
      let searchCount = this.props.searchCount;

      if (!this.state.firstSearch) {
        this.setState({
          innerTimeBound: new Date(),
          firstSearch: true
        });
      }

      currentTime = new Date();
      time = (currentTime - this.state.innerTimeBound) / 1000;

      if (time > this.state.timeLimit) { // Resetting the time to make new search
        time = 0;
        searchCount = 0;
        this.props.resetSearchCount();
        this.setState({
          innerTimeBound: new Date(),
          searchLimitFlag: false
        });
      } else {
        if (searchCount < this.state.searchLimit) {

          this.makeSearch(value);
          this.setState({
            searchLimitFlag: false
          });
        } else {
          this.setState({
            searchLimitFlag: true
          });
        }
      }
    }
  }

  makeSearch(value) {

    this.props.increaseSearchCount();
    if (!this.props.loading && value !== this.props.searchTerm) {
      if (value.length) {
        this.props.fetchPlanets(value);
      }
    }
  }

  loadMore() {
    this.props.fetchMorePlanets(this.props.nextUrl)
  }
  renderSearchField() {
    const isDisabled = !this.props.loading ? false : true;
    return (
      <div className="text-center">
        <div className="search-field">
          <input type="search" className="form-control" onKeyUp={this.searchHandler} name="search" id="search" placeholder={labels.placeholder} aria-label="Search" disabled={isDisabled} />
        </div>
      </div>
    )
  }

  renderSearchResults() {
    const planets = this.props.planets;
    const res = [];
    const elm = this.props.searchTerm;
    let maxDiameter = 0;
    if (planets.length > 0) {

      for (let i = 0; i < planets.length; i++) {
        const dm = parseInt(planets[i].diameter) || 0;
        if (maxDiameter < dm) {
          maxDiameter = dm
        }
      }
      planets.map((planet) => {
        res.push(<Planet data={planet} max={maxDiameter} key={Math.random()} />)
      });
      return res;
    } else if (this.props.searchTerm !== '') {
      return <div className="no-results-found"> {labels.noResults}</div>
    }

  }

  render() {
    const searchInput = this.renderSearchField();
    const fetching = this.props.fetching;
    const renderSearchResults = this.renderSearchResults();
    const notAllowed = `${labels.notAllowed} ${labels.searchLimit} ${labels.timeLimitText}`;

    return (
      <div>
        <nav className="navbar navbar-dark bg-light">
          <header className='search-header'><h1>{labels.searchPageTitle}</h1></header>
          <div className="user-name">{this.props.userName}</div>
        </nav>
        <main className="search-page">
          {this.state.searchLimitFlag && <div className="show error invalid-feedback">{notAllowed}</div>}
          {searchInput}
          {fetching && <Loader text={labels.loading} />}
          <div className="results-container row">
            {!fetching && renderSearchResults}
          </div>
          {this.props.nextUrl !== null && <div className="text-center"> <button className="btn btn-primary text-center load-more-btn" onClick={this.loadMore}>{labels.loadMore}</button></div>}
        </main>
      </div>
    )
  }
}