import { SubmissionError } from 'redux-form';
import * as Actions from './LoginActions';
import axios from 'axios';
import config from '../common/config';
import { errorMessages } from "../common/labels";

const fetchPeople = (name) => axios.get(config.loginUrl + name);

const loginHandler = (values, dispatch, props) => {
  const name = values.username.replace(/ /g, "+");
  const self = props;
  dispatch(Actions.loading());

  return fetchPeople(name).then((response) => {
    dispatch(Actions.loaded());
    const people = response.data.results;
    let userExists = false;
    let loggedInUser = null;
    //Map on all the persons and match with the values from FORM
    people.map((person) => {
      if (person.name.toLowerCase() === values.username.toLowerCase() && values.password === person['birth_year']) {
        userExists = true;
        loggedInUser = person;
      }
    });
    const user = {
      details: loggedInUser,
      loggedIn: userExists
    }

    sessionStorage.setItem("user", JSON.stringify(user));
    if (userExists) {
      dispatch(Actions.loginSuccess(userExists));
      dispatch(Actions.setUserData(loggedInUser));
      props.history.push('/search');
    } else {
      throw new SubmissionError({
        _error: errorMessages.loginFailed + " : " + errorMessages.noUserExists
      });
    }
  }).catch((error) => {
    if (error.errors && error.errors._error !== errorMessages.loginFailed + " : " + errorMessages.noUserExists) {
      throw new SubmissionError({
        _error: errorMessages.callFailed
      });
    } else {
      throw error;
    }
  })
};

export default loginHandler;