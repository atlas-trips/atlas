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
  openModal(evt) {
    evt.preventDefault();
    this.setState({modalOpen: !this.state.modalOpen});
  }

  addActivity(place) {
    this.setState({selected: place});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.selectedDay) {
      return;
    }
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
    let coords = this.props.activities.filter(act => act.location !== '').map(activity => ({
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
      <div className="activities-map-container">
        <div style={{width: '900px'}} className="map-container">
          <div className="map-container">
            <MapWithASearchBox
              startLat={startLat}
              startLng={startLng}
              coords={coords.filter(
                coord => coord.position.lat && coord.position.lng
              )}
              add={this.addActivity}
              clear={this.state.added}
              reset={this.resetMarker}
            />
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
              {this.state.selected.id
                ? this.state.selected.formatted_address
                : ''}
            </h4>
          </div>

          <div className="map-footer-button">
            <button type="submit" onClick={this.openModal}>
              {this.state.modalOpen ? 'Close' : 'Add'}
            </button>
          </div>
        </div>

        {this.state.modalOpen ? (
          <div className="activity-modal">
            <div className="activity-modal-contnent">
              <form onSubmit={this.handleSubmit}>
                <div className="modal-calendar">
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
                <div className="modal-form">
                  <label htmlFor="activityName" />
                  <input
                    type="text"
                    name="activityName"
                    value={this.state.activityName}
                    onChange={this.handleChange}
                    placeholder="Name of Activity"
                  />
                  <div>
                    <button type="submit">Add</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default ActivitiesForm;
