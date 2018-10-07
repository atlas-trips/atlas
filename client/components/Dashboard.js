import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import AllTrips from './AllTrips';
import SingleTrip from './SingleTrip';
import {fetchTrips, fetchSelected} from '../store/trip';
import {Link} from 'react-router-dom';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
    this.showShareLink = this.showShareLink.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrips(this.props.user.id);
  }

  async handleClick(evt, id) {
    evt.preventDefault();
    await this.props.fetchSelected(id);
    //this.setState({selected: true});
  }

  goBack(evt) {
    evt.preventDefault();
    this.setState({selected: false});
  }

  showShareLink() {
    this.setState({clicked: !this.state.clicked});
  }

  render() {
    const {user} = this.props;
    return (
      <div className='dashboard'>
        <Sidebar />
        <div className="dashboard-content">
          {this.props.trips.length > 0 ?
              <AllTrips trips={this.props.trips} select={this.handleClick} />
            : 
            <h3>No Trips Available</h3>}
        </div>
      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
});

const mapDispatch = dispatch => ({
  fetchTrips: id => dispatch(fetchTrips(id)),

});

export default connect(mapStateToProps, mapDispatch)(Dashboard);
