import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';
import {TravelForm, SingleTransport} from '../components';
import {fetchSelected} from '../store/trip';

class Travel extends Component {
  onDelete = async (userId, transportationId) => {
    await axios.delete(
      `/api/transportation/${
        this.props.selectedTrip.id
      }/${userId}/${transportationId}`
    );

    this.props.getTrip(this.props.selectedTrip.id);
  };

  displaySummary() {
    const {users} = this.props.selectedTrip;

    return users.map(user => {
      return (
        <div key={user.id} className="travel-container-card">
          <h1>{user.name}</h1>
          {user.transportation.map(transport => {
            return (
              <SingleTransport
                key={transport.id}
                transport={transport}
                user={user}
                onDelete={this.onDelete}
              />
            );
          })}
        </div>
      );
    });
  }

  render() {
    return (
      <div className="travel-container">
        <Sidebar />
        <div className="travel-container-info" style={{marginLeft: '100px'}}>
          {this.displaySummary()}
        </div>
        <TravelForm />
      </div>
    );
  }
}

const mapState = state => ({
  selectedTrip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getTrip: tripId => dispatch(fetchSelected(tripId))
});

export default connect(mapState, mapDispatch)(Travel);
