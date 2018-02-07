import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import renderInput from "./input";
import { required } from '../validation';
import loginHandler from '../loginHandler';
import labels from '../../common/labels';
import Loader from '../../common/loader'

class LoginForm extends Component {

  render() {
    const { handleSubmit, submitting, error, triggerSubmit, reset, pristine } = this.props;
    const errorClass = error ? "error" : "";
    return (
      <div className="login-container">
        <div className="text-center">
          <h1 className="login-title">{labels.loginTitle}</h1>
        </div>
        <div className="panel-body">
          <div className={`form-body ${errorClass}`}>
            <form className="form-login" onSubmit={handleSubmit}>
              <fieldset>
                <Field className="form-control" id="userName" name="username" label="User Name" component={renderInput} type="text" validate={[required]} />
                <Field className="form-control" id="password" label="Password - (Birth Year)" name="password" component={renderInput} type="password" validate={[required]} />
                <div>
                  <button className="btn btn-lg btn-success btn-block" type="submit" disabled={submitting}>
                    {labels.loginBtnLabel}
                  </button>
                  <button type="button" className="btn btn-lg btn-light btn-block" disabled={pristine || submitting} onClick={reset}>
                    {labels.clearBtnLabel}
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="server-error">{error && <strong className="show error invalid-feedback">{error}</strong>}</div>
        </div>
        <div className="login-loader">{submitting && <Loader text={labels.loading} />}</div>

      </div>
    )
  }
}


LoginForm = reduxForm({
  form: 'loginform',
  onSubmit: loginHandler
})(LoginForm);

export default LoginForm;