import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { appReducer } from '../rootReducer';
import { clearLoginDetails } from '../Login/LoginActions';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    this.props.clearLoginDetails();
    this.props.history.push('/login');
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

const mapDispatchToProps = {
  clearLoginDetails
};
export default connect(null, mapDispatchToProps)(withRouter(Logout));