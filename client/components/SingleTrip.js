import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivitiesOverview';
import AccommodationOverview from './AccommodationOverview';
// import ShareTrip from './ShareTrip';
import {connect} from 'react-redux';
import {fetchSelected, deleteTrip, shareTrip} from '../store/trip';
import Sidebar from './Sidebar';
import {email} from '../../secrets';
import Modal from 'react-responsive-modal';

const formStyle = {
  display: 'inline-block',
  width: '200px',
  height: '300px',
  marginRight: '50px'
};

class SingleTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      emailFrom: email,
      friendEmail: '',
      friendName: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onOpenModal() {
    this.setState({open: true});
  }

  onCloseModal() {
    this.setState({open: false});
  }

  handleClick(event) {
    this.setState({open: true});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleDelete(event) {
    this.props.deleteTrip(this.props.trip.id);
    this.props.history.push('/dashboard');
  }

  handleSubmit(event) {
    event.preventDefault();
    const shareLink = {
      friendEmail: this.state.friendEmail,
      emailFrom: this.state.emailFrom,
      tripLink: this.props.trip.link,
      tripName: this.props.trip.name,
      personFrom: this.props.user.name,
      name: this.state.friendName
    };
    this.props.shareTrip(shareLink);
    this.onCloseModal();
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
                {trip.name.toUpperCase()}
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

              <Modal open={this.state.open} onClose={this.onCloseModal} center>
                <div>
                  <h3>Invite Your Friends</h3>

                  <form style={formStyle} onSubmit={this.handleSubmit}>
                    <label htmlFor="friendName" />
                    <input
                      type="text"
                      name="friendName"
                      value={this.state.friendName}
                      onChange={this.handleChange}
                      placeholder="Friend's Name"
                    />

                    <label htmlFor="friendEmail" />
                    <input
                      type="email"
                      name="friendEmail"
                      value={this.state.friendEmail}
                      onChange={this.handleChange}
                      placeholder="Friend's Email"
                    />
                    <button type="submit">Share Trip</button>
                  </form>
                </div>
              </Modal>
            </div>

            <button
              type="submit"
              className="single-trip-header-buttons-invite"
              onClick={this.onOpenModal}
            >
              INVITE YOUR FRIENDS!
            </button>

            <button
              type="submit"
              className="single-trip-header-buttons-remove"
              onClick={this.handleDelete}
            >
              REMOVE TRIP
            </button>

            <div className="single-trip-info">
              <div className="single-trip-info-top">
                {!trip.users.length ? null : (
                  <ParticipantsOverview peeps={trip.users} />
                )}
              </div>

              <div className="single-trip-info-bottom">
                {!trip.activities.length ? null : (
                  <ActivitiesOverview activities={trip.activities} />
                )}
                {!trip.accommodation.length ? null : (
                  <AccommodationOverview accommodations={trip.accommodation} />
                )}
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
  trip: state.trip.selected,
  user: state.user
});
const mapDispatch = dispatch => ({
  fetchSelected: tripId => dispatch(fetchSelected(tripId)),
  deleteTrip: tripId => dispatch(deleteTrip(tripId)),
  shareTrip: link => dispatch(shareTrip(link))
});

export default connect(mapState, mapDispatch)(SingleTrip);
