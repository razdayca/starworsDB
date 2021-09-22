import React from 'react';
import ItemList from '../item-list';
import {WithData, withSwapiService} from '../hoc-helpers';


const withChildFunction = (Wrapped, fn) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const mapPersonToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};

const mapPlanetToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};

const mapStarshipToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

const PersonList = withSwapiService(WithData(
                      withChildFunction(ItemList, renderName)), mapPersonToProps);

const PlanetList = withSwapiService(WithData(
                      withChildFunction(ItemList, renderName)), mapPlanetToProps);

const StarshipList = withSwapiService(WithData(
                      withChildFunction(ItemList, renderModelAndName)), mapStarshipToProps);

export {
  PersonList,
  PlanetList,
  StarshipList
};