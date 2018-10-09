import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';
import {TravelForm, SingleTransport} from '../components';
import {fetchSelected} from '../store/trip';

class Travel extends Component {
  onDelete = async (userId, transportationId) => {
    await axios.delete(
      `/api/trips/${
        this.props.selectedTrip.id
      }/transportation/${userId}/${transportationId}`
    );

    this.props.getTrip(this.props.selectedTrip.id);
  };

  displaySummary() {
    const {users} = this.props.selectedTrip;

    return users.map(user => {
      return (
        <div key={user.id}>
          <div style={{marginBotton: '50px'}}>
            <h1
              style={{
                textAlign: 'center',
                border: '2px solid black',
                marginRight: '3px',
                borderRadius: '5px',
                backgroundColor: 'white'
              }}
            >
              {user.name}
            </h1>
          </div>
          <div className="travel-container-card">
            {user.transportation.map(transport => {
              return (
                <SingleTransport
                  key={transport.id}
                  transport={transport}
                  user={user}
                  onDelete={this.onDelete}
                  style={{marginTop: '15px'}}
                />
              );
            })}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="travel-container">
        <Sidebar />
        <div className="travel-container-info">{this.displaySummary()}</div>
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
