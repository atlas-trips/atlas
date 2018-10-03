import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';
import {fetchTransportation} from '../store/transportation';

class Travel extends Component {
  state = {
    user: '',
    method: '',
    flightNum: '',
    date: ''
  };

  componentDidMount() {
    this.props.getTransportation(this.props.selectedTrip.id);
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onPutSubmit = async event => {
    event.preventDefault();

    await axios.put(
      `/api/transportation/${this.props.seletctedTrip.id}/${
        this.state.user.id
      }`,
      this.state
    );
  };

  onPostSubmit = async event => {
    event.preventDefault();

    await axios.post(
      `/api/transportation/${this.props.selectedTrip.id}/${this.state.user.id}`,
      this.state
    );
  };

  displaySummary() {
    const {users} = this.props.selectedTrip;

    return users.map(user => {
      return (
        <div key={user.id}>
          <h1>{user.name}</h1>
          {user.transportation.map(transport => {
            return (
              <div key={transport.id}>
                <hr />
                <h3>{transport.method}</h3>
                <h3>{transport.flightNum}</h3>
                <h3>{transport.date}</h3>
              </div>
            );
          })}
        </div>
      );
    });
  }

  render() {
    const {users} = this.props.selectedTrip;

    return (
      <div className="travel-container">
        <Sidebar />

        <div className="travel-container-info" style={{marginLeft: '100px'}}>
          {this.displaySummary()}

          <form>
            <select onChange={this.onChange} name="user">
              {users.map(user => {
                return (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                );
              })}
            </select>

            <label>Method</label>
            <input
              name="method"
              onChange={this.onChange}
              value={this.state.method}
            />

            <label>Flight Number</label>
            <input
              name="flightNum"
              onChange={this.onChange}
              value={this.state.flightNum}
            />

            <label>Date</label>
            <input
              name="date"
              onChange={this.onChange}
              value={this.state.date}
            />

            <button onClick={this.onPutSubmit}>Update</button>
            <button onClick={this.onPostSubmit}>Add</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  selectedTrip: state.trip.selected,
  transportation: state.transportation
});

const mapDispatch = dispatch => ({
  getTransportation: tripId => dispatch(fetchTransportation(tripId))
});

export default connect(mapState, mapDispatch)(Travel);
