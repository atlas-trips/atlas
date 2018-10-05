import React, {Component} from 'react';
import ActivitiesForm from './ActivitiesForm';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import {sendActivityInfo, fetchActivities, deleteActivity} from '../store/trip';

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

  handleDelete(event, id){
    event.preventDefault();
    this.props.deleteActivity(this.props.trip.id, id);
  }

  async componentDidMount() {
    await this.props.fetchActivities(this.props.trip.id);
    this.setState({loaded: true})
  }

  render() {
    return (
      <div >
        <Sidebar />
          {this.state.loaded ?
          <div style={{marginLeft: '100px'}}>
          <div style={activitiesOverview}>
          <ActivitiesForm
            map={this.props.map}
            tripId={this.props.trip.id}
            activities={this.props.activities}
          />
          <div style={{textAlign: 'right', margin: '0px auto 0px auto'}}>
            Activities List
            <ul style={{listStyle: 'none'}}>
              {!this.props.activities.length
                ? null
                : this.props.activities.map(activity => {
                    return <li key={activity.id}>{activity.name} <button type='submit' onClick={ e =>this.handleDelete(e, activity.id)}>x</button> </li>;
                  })}
            </ul>
          </div>
        </div>
      </div>
          : null
        }
      </div>
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
