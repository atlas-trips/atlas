import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Sidebar from './Sidebar';
import {connect} from 'react-redux';
import {sendActivityInfo, fetchActivities, deleteActivity} from '../store/trip';
import MapWithASearchBox from './SearchMap';

const activitiesOverview = {
  display: 'flex',
  justifyContent: 'space-evenly'
};



class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      selectedDay: null,
      loaded: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDayClick(day, {selected}) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newActivity = {
      location: this.props.map,
      name: this.state.activityName,
      date: this.state.selectedDay,
      tripId: this.props.trip.id
    };
    this.props.createNewActivity(newActivity, this.props.trip.id);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
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
    let coords = this.props.activities.map(activity => (
      {
        position : {
          lat: Number(activity.location.split(',')[0]),
          lng : Number(activity.location.split(',')[1]),
        },
        id: activity.id,
        name: activity.name 

      }
    ));
    let startLat = 0;
    let startLng = 0;
    
    if(this.props.activities.length){
      coords.forEach(coord => {
        startLat += coord.position.lat;
        startLng += coord.position.lng;
      })
  
      startLat /= coords.length;
      startLng /= coords.length;
      
    }

    return (
      <div>
        <Sidebar />
          {this.state.loaded ? 
                    <div style={activitiesOverview}>
                    <div style={{marginLeft: '100px'}}>
                      <div>
                        <div style={{width: '900px'}}>
                          <MapWithASearchBox startLat={startLat} startLng={startLng} coords={coords} />
                        </div>
          
                        <h1>_______________</h1>
          
                        <form onSubmit={this.handleSubmit}>
                          <label htmlFor="activityName" />
                          <input
                            type="text"
                            name="activityName"
                            value={this.state.activityName}
                            onChange={this.handleChange}
                            placeholder="Name of Activity"
                          />
          
                          <div>
                            <DayPicker
                              selectedDays={this.state.selectedDay}
                              onDayClick={this.handleDayClick}
                            />
                            <p>
                              {this.state.selectedDay
                                ? this.state.selectedDay.toLocaleDateString()
                                : 'Please select a day'}
                            </p>
                          </div>
          
                          <button type="submit">Add activity</button>
                        </form>
                      </div>
                    </div>
          
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
          : ''
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
