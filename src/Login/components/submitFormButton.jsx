import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'

const SubmitButton = ({ dispatch, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className="btn btn-lg btn-success btn-block"
    onClick={() => dispatch(submit('loginform'))}
  >
    Submit
  </button>
)

const mapStateToProps = state => ({
  initialValues: state.login.loggedInUser
})
export default connect(mapStateToProps)(SubmitButton);