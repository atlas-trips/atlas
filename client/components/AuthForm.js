import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import {fetchRefTrip} from '../store/trip';

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
        <div className="auth-container">
          <div className="auth-form">
            <div className="auth-form-title">
              <div className="trip-form-title-content">Atlas</div>
            </div>
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
                  {this.props.match.path === '/login' ? <div className="auth-directions">Log In To Your Account</div> : <div className="auth-directions">Please Create an Account</div>}
                </div>
                {this.props.match.path === '/login' ? (
                  null
                ) : (
                  <div className="auth-form-inputs-top">
                    <label htmlFor="userName" className="auth-form-label">
                      <small>Name</small>
                    </label>
                    <input
                      name="userName"
                      type="text"
                      className="auth-form-text"
                      placeholder="my name..."
                    />
                  </div>
                )}
                <br />
                <div className={this.props.match.path === '/login' ? 'auth-form-inputs-top' : 'auth-form-inputs'}
                >
                  <label htmlFor="email" className="auth-form-label">
                    <small>Email</small>
                  </label>
                  <input
                    name="email"
                    type="text" className="auth-form-text"
                    placeholder="you@example.com"
                  />
                </div>{' '}
                <br />
                <div className="auth-form-inputs">
                  <label htmlFor="password" className="auth-form-label-pass">
                    <small>Password</small>
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="auth-form-text-pass"
                    placeholder="password"
                  />
                </div>
                <br />
                <div className="enter-button-container">
                  <button type="submit" className="enter-button">
                    {displayName}
                  </button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
              </div>
              <br />
            </form>
            {/* <div>
              <a href="/auth/google" className="auth-oauth">
                <img src="/images/google.png" width="60" alt="" />
                <small className="oauth-text">{displayName} with Google</small>
              </a>
            </div> */}
          </div>
          <div className="auth-background">
            <div className="auth-form-container" />
          </div>
        </div>
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
      const userName = evt.target.userName.value;
      dispatch(auth(email, password, formName, trip, userName));
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
