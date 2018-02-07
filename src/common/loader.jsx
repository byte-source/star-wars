import React, { Component } from 'react';
import labels from './labels'
const Loader = () => (
  <div className="loader">
    <div>{labels.loading}</div>
  </div>
);

export default Loader;