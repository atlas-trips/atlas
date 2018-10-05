import React, {Component} from 'react';
import {connect} from 'react-redux';

class EmailLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'soccerk718@yahoo.com',
      receiver: '',
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit() {
    event.preventDefault();
  }

  componentDidMount() {}

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
            value={this.state.receiver}
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
    trip: state.trip
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: () => dispatch(fet)
    shareTrip: () => dispatch()
  };
};

export default connect(null, mapDispatchToProps)(EmailLinkForm);
