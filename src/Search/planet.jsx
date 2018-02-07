import React, { Component } from 'react';

export default class Planet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const planet = this.props.data;
    const dm = parseInt(planet.diameter) || 0;
    let width = 0;
    if (dm) {
      width = (dm / this.props.max) * 100;
    } else {
      width = 50;
    }
    const divStyle = { width: width + "%" };
    return (
      <div className="planet-container col-md-6">
        <div className="row inner-container-row">
          <div className="planet-shape col-sm">
            <svg height={width * 2 + 50} width={width * 2 + 50}>
              <circle cx={width + 25} cy={width + 25} r={width} strokeWidth="3" fill="#3f6a95" />
            </svg>
          </div>
          <div className="planet-details col-sm">
            <div><strong>Name</strong> : {planet.name}</div>
            <div><strong>Climate</strong> : {planet.climate}</div>
            <div><strong>Diameter</strong> : {planet.diameter}</div>
            <div><strong>Gravity</strong> : {planet.gravity}</div>
            <div><strong>Orbital period</strong> : {planet.orbital_period}</div>
            <div><strong>Population</strong> : {planet.population}</div>
          </div>
        </div>
      </div>
    )
  }
}