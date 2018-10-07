import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSelected, shareTrip} from '../store/trip';
import {email} from '../../secrets';
import Modal from 'react-responsive-modal';

const formStyle = {
  display: 'inline-block',
  width: '200px',
  height: '300px',
  marginRight: '50px'
};

class ShareTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFrom: email,
      friendEmail: '',
      confirmationMessage: 'Your Invite has been sent!',
      open: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({open: true});
  }

  onCloseModal() {
    this.setState({open: false});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const shareLink = {
      friendEmail: this.state.friendEmail,
      emailFrom: this.state.emailFrom,
      tripLink: this.props.trip.selected.link,
      tripName: this.props.trip.selected.name,
      personFrom: this.props.user.name
    };
    this.props.shareTrip(shareLink);
    this.onCloseModal();
  }

  componentDidMount() {
    this.props.fetchSelected(this.props.user.id);
  }

  render() {
    return (
      <Modal open={this.state.open} onClose={this.onCloseModal} center>
        <div>
          <h3>Invite Your Friends</h3>

          <form style={formStyle} onSubmit={this.handleSubmit}>
            <label htmlFor="friendEmail" />
            <input
              type="email"
              name="friendEmail"
              value={this.state.friendEmail}
              onChange={this.handleChange}
              placeholder="Friends Email"
            />

            <button type="submit">Share Trip</button>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    trip: state.trip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSelected: tripId => dispatch(fetchSelected(tripId)),
    shareTrip: link => dispatch(shareTrip(link))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareTrip);
