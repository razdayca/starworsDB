import React, { Component } from 'react';
import Row from '../Row';
import { PlanetList, PlanetDetails } from '../sw-components';

export default class PlanetPage extends Component {
    state = {
        selectedItem: null
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem});
    };

    render() {
        const {selectedItem} = this.state;

        return (
            <Row left={<PlanetList onItemSelected={this.onItemSelected}/>} right={<PlanetDetails itemId={selectedItem}/>}/>
        );
    }
}