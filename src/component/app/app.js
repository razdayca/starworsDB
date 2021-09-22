import React, { Component } from 'react';
import Header from '../header';
import RandomPlanet from '../planet';
import SwapiService from '../../services/services';
import {SwapiServiceProvider} from '../services-context';
import {PeoplePage, StarshipPage, PlanetPage} from '../pages'

import './app.css';


export default class App extends Component {

  swapiService = new SwapiService();

  render() {
   
    return (
      <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />

            <RandomPlanet updateInterval={8000}/>

            <PeoplePage/>
            <StarshipPage/>
            <PlanetPage/>
          
        </div>
      </SwapiServiceProvider>
        
    );
  }
}