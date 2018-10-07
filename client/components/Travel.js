import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';
import {TravelForm} from '../components';
import {SingleTransport} from '../components';
import {fetchSelected} from '../store/trip';

class Travel extends Component {
  state = {
    user: '',
    method: '',
    flightNum: '',
    date: ''
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onDelete = async (userId, transportationId) => {
    await axios.delete(
      `/api/transportation/${
        this.props.selectedTrip.id
      }/${userId}/${transportationId}`,
      this.state
    );

    this.props.getTrip(this.props.selectedTrip.id);
  };

  // onPostSubmit = async event => {
  //   event.preventDefault();
  //   const {users} = this.props.selectedTrip;
  //   const [user] = users.filter(u => u.name === this.state.user);

  //   await axios.post(
  //     `/api/transportation/${this.props.selectedTrip.id}/${user.id}`,
  //     this.state
  //   );
  //   this.setState({user: '', method: '', flightNum: '', date: ''});
  // };

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
              // <div key={transport.id}>
              //   <hr />
              //   <h3>{transport.method}</h3>
              //   {!transport.flightNum ? null : (
              //     <h3>
              //       <a
              //         href={`http://www.google.com/search?q=${
              //           transport.flightNum
              //         }`}
              //       >
              //         {transport.flightNum}
              //       </a>
              //     </h3>
              //   )}

              //   <h3>
              //     {transport.date.replace(
              //       /(\d{4})\-(\d{2})\-(\d{2}).*/,
              //       '$3-$2-$1'
              //     )}
              //   </h3>
              // </div>
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
