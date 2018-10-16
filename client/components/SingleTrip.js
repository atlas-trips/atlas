import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivityComponents/ActivitiesOverview'
import AccommodationOverview from './AccommodationComponents/AccommodationOverview';
import {connect} from 'react-redux';
import {fetchSelected, deleteTrip, shareTrip} from '../store/trip';
import Sidebar from './Sidebar';
import {email} from '../../secrets';
import Modal from 'react-responsive-modal';
import {Header} from '../components';

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
    if (Object.keys(this.props.trip).length) {
      return (
        <div className="single-trip">
          <Header />
          <Sidebar />
          <div className="single-trip-right">
            <div className="single-trip-header">
              <Modal open={this.state.open} onClose={this.onCloseModal} left>
                <div>
                  <h3>Invite Your Friends</h3>

                  <form className="modal-form" onSubmit={this.handleSubmit}>
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
              className="single-trip-header-buttons-remove"
              onClick={this.handleDelete}
            >
              DELETE TRIP
            </button>

            <div className="single-trip-info">
              <div className="single-trip-info-top">
                {!trip.users ? null : (
                  <div className="participants-container-single-trip">
                    <ParticipantsOverview peeps={trip.users} />
                    <button
                      type="submit"
                      className="single-trip-header-buttons-invite"
                      onClick={this.onOpenModal}
                    >
                      INVITE A FRIEND
                    </button>
                  </div>
                )}
              </div>
              <div className="single-trip-bottom-container">
                <div className="single-trip-info-bottom">
                  {!trip.activities ? null : (
                    <ActivitiesOverview activities={trip.activities} />
                  )}
                  {!trip.accommodation ? null : (
                    <AccommodationOverview
                      accommodations={trip.accommodation}
                    />
                  )}
                </div>
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
