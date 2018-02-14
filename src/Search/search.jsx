import React, { Component } from 'react';
import Planet from './planet';
import Loader from '../common/loader';
import labels from '../common/labels';
import config from '../common/config';
import Logout from '../Logout/logout';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.renderSearchField = this.renderSearchField.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
    this.loadMore = this.loadMore.bind(this);

    this.state = {
      fireSetTimeOut: false,
      timeOut: 1000,
    }
  }

  searchHandler(event) {
    event.persist();
    const value = event.target.value;
    clearTimeout(this.state.fireSetTimeOut);

    if (value) {
      this.setState({
        fireSetTimeOut: setTimeout(this.props.searchPlanets, this.state.timeOut, value)
      });
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
    } else if (this.props.searchTerm !== '' && !this.props.fetching) {
      return <div className="no-results-found"> {labels.noResults}</div>
    } else {
      return null;
    }

  }

  render() {
    const searchInput = this.renderSearchField();
    const fetching = this.props.fetching;
    const renderSearchResults = this.renderSearchResults();
    const notAllowed = `${labels.notAllowed} ${config.searchLimit} ${labels.timeLimitText}`;
    return (
      <div>
        <nav className='navbar navbar-dark bg-light'>
          <header className='search-header'><h1>{labels.searchPageTitle}</h1></header>
          <div className='user-name'>{this.props.userName}</div>
          <Logout />
        </nav>
        <main className='search-page'>
          {this.props.searchLimitFlag && <div className='show error invalid-feedback'>{notAllowed}</div>}
          {searchInput}
          {fetching && <Loader text={labels.loading} />}
          <div className='results-container row'>
            {!fetching && renderSearchResults}
          </div>
          {this.props.nextUrl !== null && <div className='text-center'> <button className='btn btn-primary text-center load-more-btn' onClick={this.loadMore}>{labels.loadMore}</button></div>}
        </main>
      </div>
    )
  }
}