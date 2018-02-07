import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { appReducer } from '../rootReducer';
class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    sessionStorage.clear();
    appReducer(null, {
      type: 'USER_LOGOUT'
    });
    //this.props.logOut();
    const that = this;
    /* const promise = new Promise((resolve, reject) => {
      sessionStorage.clear();
      this.props.clearState();
      if (sessionStorage.getItem('user') === null && that.props.login === undefined) {
        console.log('resolve');
        resolve();
      } else {
        console.log('reject');
        reject();
      }
    });

    promise.then(() => {
      this.props.history.push('/login');
    }).catch((error) => {
      debugger;
    }); */

    // sessionStorage.clear();
    // this.props.clearState();
    // if (sessionStorage.getItem('user') === null && this.props.login === undefined) {
    //   console.log('resolve');
    //   this.props.history.push('/login');
    // } else {
    //   console.log('reject');
    //   //reject();
    // }
  }

  render() {
    const btnName = this.props.loggingOut ? 'logging Out..' : 'Logout';
    return (
      <div className="logout-container">
        <span>{this.props.name}</span>
        <button type="button" className="btn btn-link" onClick={this.logoutHandler}>{btnName}</button>
      </div>
    )
  }
}

export default withRouter(Logout);