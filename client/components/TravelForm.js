import React, {Component} from 'react';
import axios from 'axios';
import {fetchSelected} from '../store/trip';
import {connect} from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class TravelForm extends Component {
  state = {
    selectedUser: '',
    method: '',
    flightNum: '',
    date: undefined
  };

  selectDay = day => {
    this.setState({date: day});
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const {users} = this.props.selectedTrip;
    const [selectedUser] = users.filter(
      u => u.name === this.state.selectedUser
    );

    await axios.post(
      `/api/trips/${this.props.selectedTrip.id}/transportation/${
        selectedUser.id
      }`,
      this.state
    );
    this.setState({
      selectedUser: '',
      method: '',
      flightNum: '',
      date: undefined
    });
    this.props.getTrip(this.props.selectedTrip.id);
  };

  render() {
    const {users} = this.props.selectedTrip;
    const enabled =
      this.state.selectedUser && this.state.method && this.state.date;

    return (
      <form onSubmit={this.onSubmit} className="travel-form">
        <label className="travel-form-label">User</label>
        <select
          value={this.state.selectedUser}
          onChange={this.onChange}
          name="selectedUser"
        >
          <option defaultValue={this.state.selectedUser}>--</option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            );
          })}
        </select>

        <label>Method</label>
        <select
          value={this.state.method}
          onChange={this.onChange}
          name="method"
        >
          <option defaultValue={this.state.method}>--</option>
          <option value="Flight">Flight</option>
          <option value="Car">Car</option>
          <option value="Bus">Bus</option>
          })}
        </select>

        {this.state.method !== 'Flight' ? null : (
          <div>
            <label>Flight Number</label>
            <input
              name="flightNum"
              onChange={this.onChange}
              value={this.state.flightNum}
            />
          </div>
        )}

        <label>Date</label>
        <DayPickerInput onDayChange={this.selectDay} />

        <button disabled={!enabled} type="submit">
          Add Transportation{' '}
        </button>
      </form>
    );
  }
}

const mapState = state => ({
  selectedTrip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getTrip: tripId => dispatch(fetchSelected(tripId))
});

export default connect(mapState, mapDispatch)(TravelForm);
