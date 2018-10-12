import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';
import {TravelForm, SingleTransport, Header} from '../components';
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
      const transportation = user.transportation.filter(
        transport => transport.tripId === this.props.selectedTrip.id
      );
      return (
        <div key={user.id}>
          <div style={{marginBotton: '50px'}}>
            <h3
              style={{
                textAlign: 'center',
                border: '2px solid black',
                marginRight: '3px',
                borderRadius: '5px',
                backgroundColor: 'white'
              }}
            >
              {user.name}
            </h3>
          </div>
          <div className="travel-container-card">
            {transportation.map(transport => {
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
      <div>
        <Header />
          <Sidebar />

        <div className="travel-container">
          <div className="travel-container-info">{this.displaySummary()}</div>
          <TravelForm />
        </div>
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
