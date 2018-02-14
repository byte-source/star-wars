import { connect } from 'react-redux';
import React, { Component } from 'react';

const mapStateToProps = state => {
  return {
    loggedInUser: state.login.loggedInUser
  }
}


export default function isAuthorised(WrappedComponent) {

  class Auth extends React.Component {

    checkAndRedirect() {
      if (!this.props.loggedInUser) {
        this.props.history.push('/login');
      }
    }

    componentDidMount() {
      this.checkAndRedirect();
    }

    componentDidUpdate() {
      this.checkAndRedirect();
    }

    render() {
      if (this.props.loggedInUser) {
        return <WrappedComponent {...this.props} />
      }

      return null;
    }
  }
  return connect(mapStateToProps)(Auth);
}

