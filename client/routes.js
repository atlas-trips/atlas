import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Login,
  Signup,
  Dashboard,
  Accommodations,
  Calendar,
  Expenses,
  Activities,
  Travel,
  Landing,
  TripForm,
  AccommodationForm,
  ShareTrip,
  SingleTrip
} from './components';
import {me} from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const {isLoggedIn, inTrip} = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/join/:link" component={Signup} />

        {isLoggedIn &&
          Object.keys(inTrip).length > 0 && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/trip/:id" component={SingleTrip} />
              <Route path="/accommodations" component={Accommodations} />
              <Route path="/calendar" component={Calendar} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/activities" component={Activities} />
              <Route path="/travel" component={Travel} />
              <Route path="/new" component={TripForm} />
              <Route path="/addaccommodation" component={AccommodationForm} />
              <Route path="/trips/share" component={ShareTrip} />
            </Switch>
          )}

        {isLoggedIn &&
          Object.keys(inTrip).length === 0 && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/trip/:id" component={SingleTrip} />
              <Route path="/accommodations" component={Dashboard} />
              <Route path="/calendar" component={Dashboard} />
              <Route path="/expenses" component={Dashboard} />
              <Route path="/activities" component={Dashboard} />
              <Route path="/travel" component={Dashboard} />
              <Route path="/new" component={Dashboard} />
              <Route path="/addaccommodation" component={Dashboard} />
              <Route path="/trips/share" component={Dashboard} />
            </Switch>
          )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    inTrip: state.trip.selected
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
