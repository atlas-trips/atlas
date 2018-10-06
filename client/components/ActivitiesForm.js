import React, {Component} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MapWithASearchBox from './SearchMap';

class ActivitiesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      selectedDay: null,
      selected: {},
      added: false
    };
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.resetMarker = this.resetMarker.bind(this);
  }

  handleDayClick(day, {selected}) {
    this.setState({
      selectedDay: selected ? undefined : day
    });
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
    this.setState({added: true});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  resetMarker() {
    this.setState({added: false});
  }

  render() {
    console.log(
      this.state.selected.formatted_address + '\n' + this.state.selected.name
    );
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
      <div>
        <div style={{width: '900px'}}>
          <MapWithASearchBox
            startLat={startLat}
            startLng={startLng}
            coords={coords}
            add={this.addActivity}
            clear={this.state.added}
            reset={this.resetMarker}
          />
        </div>
        <h3>
          Selected:{this.state.selected.id
            ? ' ' + this.state.selected.name
            : ''}
        </h3>
        <h4>
          {this.state.selected.id ? this.state.selected.formatted_address : ''}
        </h4>
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
    );
  }
}

export default ActivitiesForm;
