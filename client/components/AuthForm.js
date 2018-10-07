import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import {fetchRefTrip} from '../store/trip';
import axios from 'axios';

/**
 * COMPONENT
 */

class AuthForm extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.match.params.link) {
      this.props.getTrip(this.props.match.params.link);
    }
  }

  render() {
    const {
      name,
      displayName,
      handleSubmit,
      handleSignUpSubmit,
      error
    } = this.props;

    return (
      <div>
        <form
          onSubmit={
            this.props.location.pathname === '/login'
              ? event => handleSubmit(event)
              : event => handleSignUpSubmit(event, this.props.trip.selected)
          }
          name={
            this.props.location.pathname.startsWith('/join')
              ? 'refsignup'
              : name
          }
        >
          <div>
            <div>
              {!this.props.match.params.link ? null : (
                <h4>Join trip {this.props.trip.selected.name}</h4>
              )}
            </div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    trip: state.trip,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    },
    handleSignUpSubmit(evt, trip) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName, trip));
    },
    getTrip: uniqueLink => dispatch(fetchRefTrip(uniqueLink))
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
