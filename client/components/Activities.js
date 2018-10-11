import React, {Component} from 'react';
import ActivitiesForm from './ActivitiesForm';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import {sendActivityInfo, fetchActivities, deleteActivity} from '../store/trip';
import {Header} from '../components';

const activitiesOverview = {
  display: 'flex',
  justifyContent: 'space-evenly'
};

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(event, id) {
    event.preventDefault();
    this.props.deleteActivity(this.props.trip.id, id);
  }
  selectActivity(place) {
    this.setState({added: true, selected: place});
  }

  async componentDidMount() {
    await this.props.fetchActivities(this.props.trip.id);
    this.setState({loaded: true});
  }
  resetMarker() {
    this.setState({added: false});
  }

  render() {
    return (
      <Header>
        <Sidebar />
        {this.state.loaded ? (
          <div style={{marginLeft: '10px'}}>
            <div style={activitiesOverview}>
              <ActivitiesForm
                map={this.props.map}
                tripId={this.props.trip.id}
                activities={this.props.activities}
                createNewActivity={this.props.createNewActivity}
              />
              <div className="activity-list">
                <div className="activity-list-header">
                  <h4 style={{textAlign: 'center', margin: 0}}>
                    Activities List
                  </h4>
                </div>
                <ul>
                  {!this.props.activities.length
                    ? null
                    : this.props.activities.map(activity => {
                        return (
                          <li key={activity.id}>
                            {activity.name}{' '}
                            <button
                              type="submit"
                              onClick={e => this.handleDelete(e, activity.id)}
                            >
                              x
                            </button>{' '}
                          </li>
                        );
                      })}
                </ul>
              </div>
            </div>
          </div>
        ) : null}
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trip: state.trip.selected,
  activities: state.trip.activities,
  map: state.map
});

const mapDispatchToProps = dispatch => {
  return {
    createNewActivity: (obj, tripId) => dispatch(sendActivityInfo(obj, tripId)),
    fetchActivities: id => dispatch(fetchActivities(id)),
    deleteActivity: (tripId, actId) => dispatch(deleteActivity(tripId, actId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
