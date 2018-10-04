import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import axios from 'axios';

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

  onPutSubmit = async event => {
    event.preventDefault();
    const {users} = this.props.selectedTrip;
    const [user] = users.filter(u => u.name === this.state.user);

    await axios.put(
      `/api/transportation/${this.props.selectedTrip.id}/${user.id}`,
      this.state
    );

    this.setState({user: '', method: '', flightNum: '', date: ''});
  };

  onPostSubmit = async event => {
    event.preventDefault();
    const {users} = this.props.selectedTrip;
    const [user] = users.filter(u => u.name === this.state.user);

    await axios.post(
      `/api/transportation/${this.props.selectedTrip.id}/${user.id}`,
      this.state
    );
    this.setState({user: '', method: '', flightNum: '', date: ''});
  };

  displaySummary() {
    const {users} = this.props.selectedTrip;

    return users.map(user => {
      return (
        <div key={user.id} className="travel-container-card">
          <h1>{user.name}</h1>
          {user.transportation.map(transport => {
            return (
              <div key={transport.id}>
                <hr />
                <h3>{transport.method}</h3>
                {!transport.flightNum ? null : (
                  <h3>
                    <a
                      href={`http://www.google.com/search?q=${
                        transport.flightNum
                      }`}
                    >
                      {transport.flightNum}
                    </a>
                  </h3>
                )}

                <h3>
                  {transport.date.replace(
                    /(\d{4})\-(\d{2})\-(\d{2}).*/,
                    '$3-$2-$1'
                  )}
                </h3>
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
        </div>
        <form className="travel-form">
          <label>User</label>
          <select onChange={this.onChange} name="user">
            <option defaultValue="--">--</option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>

          <label>Method</label>
          <select onChange={this.onChange} name="method">
            <option defaultValue="--">--</option>
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
          <input name="date" onChange={this.onChange} value={this.state.date} />

          <button onClick={this.onPutSubmit}>Update</button>
          <button onClick={this.onPostSubmit}>Add</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  selectedTrip: state.trip.selected
});

export default connect(mapState)(Travel);
