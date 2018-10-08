import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
//import MapWithASearchBox from './SearchMap';

const activityFormStyle = {
  border: '2px solid black',
  display: 'flex',
  justifyContent: 'space-around',
  borderRadius: '15px',
  width: '500px'
};

class ActivitiesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      selectedDay: null,
      selected: {},
      added: false,
      modalOpen: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.resetMarker = this.resetMarker.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleDayClick(day, {selected}) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
  }
  openModal(evt){
    evt.preventDefault();
    this.setState({modalOpen: !this.state.modalOpen})
  }

  addActivity(place) {
    this.setState({selected: place});
  }

  handleSubmit(event) {
    event.preventDefault();
    const newActivity = {
      location: this.props.map,
      name: this.state.activityName,
      date: this.state.selectedDay,
      tripId: this.props.tripId
    };
    this.props.createNewActivity(newActivity, this.props.tripId);
    this.setState({added: true, modalOpen: false});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  resetMarker() {
    this.setState({added: false});
  }

  render() {
    let coords = this.props.activities.map(activity => ({
      position: {
        lat: Number(activity.location.split(',')[0]),
        lng: Number(activity.location.split(',')[1])
      },
      id: activity.id,
      name: activity.name
    }));
    let startLat = 0;
    let startLng = 0;

    if (this.props.activities.length) {
      coords.forEach(coord => {
        startLat += coord.position.lat;
        startLng += coord.position.lng;
      });

      startLat /= coords.length;
      startLng /= coords.length;
    }
    return (
      <div className="activities-container">
        <div style={{width: '900px'}} className="map-container">
        <div className='map-container'>
        { /*
          <MapWithASearchBox
            startLat={startLat}
            startLng={startLng}
            coords={coords}
            add={this.addActivity}
            clear={this.state.added}
            reset={this.resetMarker}
          
          />
          */} 
          </div>
          
          
        </div>
        <div className="map-footer">
          <div className="map-footer-text">
            <h3>
              Selected:{this.state.selected.id
                ? ' ' + this.state.selected.name
                : ''}
            </h3>
           <h4>
            {this.state.selected.id ? this.state.selected.formatted_address : ''}
          </h4>
          </div>

          <div className="map-footer-button">
                <button type='submit' onClick={this.openModal}>Add</button>
          </div>
        </div>
        <hr />
        {this.state.modalOpen?
                  <form style={activityFormStyle} onSubmit={this.handleSubmit}>
                  <div>
                    <p>
                      {this.state.selectedDay
                        ? this.state.selectedDay.toLocaleDateString()
                        : 'Please select a day'}
                    </p>
        
                    <DayPicker
                      onDayClick={this.handleDayClick}
                      selectedDays={this.state.selectedDay}
                    />
                  </div>
                  <div style={{position: 'center', margin: '0 auto'}}>
                    <label htmlFor="activityName" />
                    <input
                      type="text"
                      name="activityName"
                      value={this.state.activityName}
                      onChange={this.handleChange}
                      placeholder="Name of Activity"
                      style={{display: 'block'}}
                    />
        
                    <button type="submit">Add activity</button>
                  </div>
                </form> : ''}
      </div>
    );
  }
}

export default ActivitiesForm;
