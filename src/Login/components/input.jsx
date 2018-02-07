import React from 'react';

const renderInput = ({ input, meta, id, label, type }) => {
  var error = meta.touched && meta.error ? "is-invalid" : "";
  return (
    <div className={`form-group`}>
      <label htmlFor="userName">{label}</label>
      <input className={`form-control ${error}`} {...input} id={id} type={type} />
      {meta.touched && meta.error && <span className="error invalid-feedback">{meta.error}</span>}
    </div>
  )
}

export default renderInput;