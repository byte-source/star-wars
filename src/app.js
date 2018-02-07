import './styles/app.scss';
import React, { Component } from 'react';
import { render } from 'react-dom';
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, IndexRoute, browserHistory, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Login/components/login';
import Search from './Search/searchContainer';
import NotFound from './NotFound';
import appStore from './appStore';


class App extends Component {

  render() {

    return (
      <Provider store={appStore}>
        <Router history={browserHistory}>
          <div className="container-fluid">{/* 
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/search">search</Link></li>
            </ul> */}

            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/search" component={Search} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;