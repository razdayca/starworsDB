import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwapiService from '../../services/services';
import Spinner from '../spinner';
import ErrorMessage from '../error';

import './planet.css';

export default class RandomPlanet extends Component {

  SwapiService = new SwapiService();

  state = {
    planet: {},
    loading: true,
    error: false
  };

  static defaultProps = {
    updateInterval: 8000
  };

  static propTypes = {
    setInterval: PropTypes.number
  }

  componentDidMount() {
    const {updateInterval} = this.props
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, updateInterval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    })
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  }

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 10) + 2;
    this.SwapiService
    .getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError)
  }
  

  render() {

    const {planet, loading, error} = this.state;

    const errorMassege = error ? <ErrorMessage/> : null;

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner/> : null;
    const content = hasData ? <RandomWiew planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMassege}
        {spinner}
        {content}
      </div>

    );
  }
}

const RandomWiew = ({planet}) => {

  const {id, name, population, rotationPeriod, diameter} = planet;
  const _urlImage = 'https://starwars-visualguide.com/assets/img/planets/';

  return (
    <>
      <img className="planet-image" src={`${_urlImage}${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </>
  )
}