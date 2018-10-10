import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivitiesOverview';
import AccommodationOverview from './AccommodationOverview';
import ShareTrip from './ShareTrip';
import {connect} from 'react-redux';
import {fetchSelected, deleteTrip} from '../store/trip';
import Sidebar from './Sidebar';

class SingleTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    this.setState({open: true});
  }

  handleDelete(event) {
    this.props.deleteTrip(this.props.trip.id);
    this.props.history.push('/dashboard');
  }

  async componentDidMount() {
    await this.props.fetchSelected(this.props.match.params.id);
  }

  render() {
    const trip = this.props.trip;
    const singleTripStyle = trip.name
      ? {
          display: 'flex',
          flexDirection: 'column',
          //backgroundImage: `url('/images/${trip.name.toLowerCase()}.jpg')`,
          height: '100vh',
          margin: '-20px'
        }
      : '';

    if (Object.keys(this.props.trip).length) {
      return (
        <div className="single-trip">
          <Sidebar />
          <div className="single-trip-right" style={singleTripStyle}>
            <div className="single-trip-header">
              <div className="single-trip-header-name">
                {trip.name.toUpperCase()}:
              </div>
              <div className="single-trip-header-dates">
                <span>
                  {new Date(trip.startDate.slice(0, 10))
                    .toString()
                    .slice(0, 16)}{' '}
                  to{' '}
                  {new Date(trip.endDate.slice(0, 10)).toString().slice(0, 16)}
                </span>
              </div>
              <div>
                <button
                  className="single-trip-header-buttons-invite"
                  onClick={this.handleClick}
                >
                  INVITE YOUR FRIENDS! {this.state.open ? <ShareTrip /> : null}
                </button>
              </div>
            </div>
            <button
              id="remove-trip"
              className="single-trip-header-buttons-remove"
              onClick={this.handleDelete}
            >
              REMOVE TRIP
            </button>

            <div className="single-trip-info">
              <div className="single-trip-info-top">
                <ParticipantsOverview peeps={trip.users} />
              </div>

              <div className="single-trip-info-bottom">
                <ActivitiesOverview activities={trip.activities} />
                <AccommodationOverview accommodations={trip.accommodation} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

const mapState = state => ({
  trip: state.trip.selected
});
const mapDispatch = dispatch => ({
  fetchSelected: tripId => dispatch(fetchSelected(tripId)),
  deleteTrip: tripId => dispatch(deleteTrip(tripId))
});

export default connect(mapState, mapDispatch)(SingleTrip);
