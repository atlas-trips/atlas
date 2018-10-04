import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import AllTrips from './AllTrips';
import SingleTrip from './SingleTrip';
import {fetchTrips, fetchSelected} from '../store/trip';
import {throws} from 'assert';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
    this.showShareLink = this.showShareLink.bind(this);
  }
  componentDidMount() {
    this.props.fetchTrips(this.props.user.id);
  }

  async handleClick(evt, id) {
    evt.preventDefault();
    await this.props.fetchSelected(id);
    this.setState({selected: true});
  }

  goBack(evt) {
    evt.preventDefault();
    this.setState({selected: false});
  }

  showShareLink() {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    const {user} = this.props;
    //const onATrip = false //Object.keys(this.props.selected).length;
    if (this.props.trips.length > 0) {
      return (
        <div style={{display: 'flex', marginLeft: '100px'}}>
          <Sidebar />
          <div style={{margin: '0 auto'}}>
            {this.state.selected ? (
              <div className="selected-trip">
                <a href="/dashboard" onClick={this.goBack}>
                  <h4>{'< Back'}</h4>
                </a>
                <h3>{user.name}'s Trip:</h3>
                <div>
                  <p onClick={this.showShareLink}>
                    Share Your Trip
                    {this.state.clicked ? (
                      <span>{this.props.selected.link}</span>
                    ) : (
                      ''
                    )}
                  </p>
                  <SingleTrip trip={this.props.selected} />
                </div>
              </div>
            ) : (
              <AllTrips trips={this.props.trips} click={this.handleClick} />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="noTrips">
          <Sidebar />
          <div className="noTrips-content">
            <h3>No Trips Available</h3>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
});

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id)),
  fetchSelected: tripId => dispatch(fetchSelected(tripId))
});

export default connect(mapStateToProps, mapDispatch)(Dashboard);
