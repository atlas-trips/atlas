import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import AllTrips from './AllTrips';
import {fetchTrips, fetchSelected} from '../store/trip';
import {Link} from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.user.id);
  }

  handleClick(evt, id) {
    evt.preventDefault();
    this.props.fetchSelected(id);
  }

  goBack(evt) {
    evt.preventDefault();
    this.setState({selected: false});
  }

  render() {
    const {user} = this.props;
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard-content">
          {this.props.trips.length > 0 ? (
            <AllTrips trips={this.props.trips} select={this.handleClick} />
          ) : (
            <div className="dashboard-no-trips">
              <h2>No Trips Available</h2>
              <Link to="/new">
                <button className="add-trip">ADD A TRIP </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
});

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id))
});

export default connect(mapStateToProps, mapDispatch)(Dashboard);
