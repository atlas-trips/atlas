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
                  marginBottom: '1px'
                }}
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
                  marginBottom: '1px'
                }}
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
            </div>

            <div style={travelFormStyle}>
              <label className="travel-form-label">Date</label>
              <DayPickerInput
                className="travel-form-label"
                onDayChange={this.selectDay}
                style={{
                  border: '0px'
                }}
              />
            </div>
          </div>

          <div>
            <button
              disabled={!enabled}
              type="submit"
              style={{
                color: 'white',
                fontSize: '1.4em',
                fontWeight: 'bolder',
                backgroundColor: '#c60057',
                borderRadius: '10px',
                align: 'left',
                marginLeft: '10px'
              }}
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
