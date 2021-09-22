import React, { Component } from 'react';
import SwapiService from '../../services/services';
import Spinner from '../spinner'; 
import './item-details.css';

const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
              <span className="term">{label}</span>
              <span>{item[field]}</span>
    </li>
  );
};

export {
  Record
};

export default class PersonDetails extends Component {

  SwapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
    image: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem()
    }
  }

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if(!itemId) {
      return;
    }

    this.setState(() => {
      const {loading} = this.state;
      return {
        loading: !loading
      }
    })

    getData(itemId)
    .then((item, loading) => {
      this.setState({
        item,
        loading: !loading,
        image: getImageUrl(item)
      })
    })
  }

  componentDidMount() {
    this.updateItem();
  }

  render() {

    if (!this.state.item) {
      return <span>Выберите персонажа!</span>
    }

    const {name} = this.state.item;
    const {item, loading, image} = this.state;

    if (!loading) {
      return <Spinner/>
    }
    
    return (
      <div className="person-details card">
        <img className="person-image" src={image}/>
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}