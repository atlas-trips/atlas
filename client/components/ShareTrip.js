import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSelected, shareTrip} from '../store/trip';
import {email} from '../../secrets';

class ShareTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailFrom: email,
      friendEmail: '',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    const shareLink = {
      friendEmail: this.state.friendEmail,
      emailFrom: this.state.emailFrom,
      message: this.state.message,
      tripLink: this.props.trip.selected.link,
      tripName: this.props.trip.selected.name,
      personFrom: this.props.user.name
    };
    console.log('sending over', shareLink);
    this.props.shareTrip(shareLink);
  }

  componentDidMount() {
    this.props.fetchSelected(this.props.user.id);
  }

  render() {
    console.log('redux state', this.props);

    return (
      <div>
        <h1>Share Your Trip with Your Friends</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="friendEmail" />
          <input
            type="email"
            name="friendEmail"
            value={this.state.friendEmail}
            onChange={this.handleChange}
            placeholder="Friends Email"
          />

          <label htmlFor="message" />
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Additional Message"
          />

          <button type="submit">Share Trip</button>
        </form>
      </div>
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
