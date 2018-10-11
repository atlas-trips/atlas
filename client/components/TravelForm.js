import React, {Component} from 'react';
import axios from 'axios';
import {fetchSelected} from '../store/trip';
import {connect} from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const travelFormStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #c60057',
  fontFamily: "'Istok Web', sans-serif",
  width: '330px',
  margin: '10px 10px 25px 10px',
  borderRadius: '3px'
};

class TravelForm extends Component {
  state = {
    selectedUser: 0,
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

    await axios.post(
      `/api/trips/${this.props.selectedTrip.id}/transportation/${
        this.state.selectedUser
      }`,
      {...this.state, tripId: this.props.selectedTrip.id}
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
      <div style={{margin: '0 auto'}}>
        <form
          onSubmit={this.onSubmit}
          className="travel-form"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly'
          }}
        >
          <h3 style={{textAlign: 'center'}}>Add Mode of Transporation</h3>
          <div>
            <div style={travelFormStyle}>
              <label className="travel-form-label">User</label>
              <select
                value={this.state.selectedUser}
                onChange={this.onChange}
                name="selectedUser"
                style={{
                  border: '0px',
                  outline: '0px',
                  marginRight: '1px',
                  marginBottom: '1px',
                  width: '150px'
                }}
              >
                <option defaultValue={this.state.selectedUser}>--</option>
                {users.map(user => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div style={travelFormStyle}>
              <label className="travel-form-label">Method</label>
              <select
                value={this.state.method}
                onChange={this.onChange}
                name="method"
                style={{
                  border: '0px',
                  outline: '0px',
                  marginRight: '1px',
                  marginBottom: '1px',
                  width: '150px',
                  backgroundColor: 'none'
                }}
              >
                <option defaultValue={this.state.method}>--</option>
                <option value="Flight">Flight</option>
                <option value="Train">Train</option>
                <option value="Car">Car</option>
                <option value="Bus">Bus</option>
                <option value="Other">Other</option>
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
            </div>

            <div style={travelFormStyle}>
              <label className="travel-form-label">Date</label>
              <DayPickerInput
                onDayChange={this.selectDay}
                className="travel-form-label-input"
              />
            </div>
          </div>

          <div>
            <button
              className="travel-form-button"
              disabled={!enabled}
              type="submit"
            >
              {' '}
              SUBMIT{' '}
            </button>
          </div>
        </form>
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

export default connect(mapState, mapDispatch)(TravelForm);
