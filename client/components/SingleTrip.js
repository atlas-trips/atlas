import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivitiesOverview';
import AccommodationOverview from './AccommodationOverview';
import ShareTrip from './ShareTrip';
import {connect} from 'react-redux';
import {fetchSelected, deleteTrip} from '../store/trip';
import Sidebar from './Sidebar';

const divStyle = {
  textAlign: 'center',
  border: '2px solid black',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '10px',
  marginRight: '15px',
  borderRadius: '15px'
};

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

    if (Object.keys(this.props.trip).length) {
      return (
        <div className="single-trip">
          <Sidebar />
          <div className="single-trip-header">
            {trip.name}: {trip.startDate.slice(0, 10)} to{' '}
            {trip.endDate.slice(0, 10)}
            <button
              style={{...divStyle, color: 'black'}}
              onClick={this.handleClick}
            >
              Invite your Friends {this.state.open ? <ShareTrip /> : null}
            </button>
            <button
              style={{...divStyle, color: 'black'}}
              onClick={this.handleDelete}
            >
              Remove Trip
            </button>
          </div>
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
