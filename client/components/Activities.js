import React, {Component} from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'
import {sendActivityInfo, fetchActivities} from '../store/trip'
import MapWithASearchBox from './SearchMap';

class Activities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityName: '',
      activitySearch: '',
      activityLocation: '',
      selectedDay: null
    }
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleDayClick(day, {selected}) {
    this.setState({
      selectedDay: selected ? undefined : day
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const newActivity = {
      location: this.state.activityLocation,
      name: this.state.activityName,
      date: this.state.selectedDay,
      tripId: this.props.trip.id
    }
    console.log('id is', typeof this.props.trip.id)
    this.props.send(newActivity, this.props.trip.id)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log('user', this.props)

    return (
      <div>
        <Sidebar />
        <div style={{marginLeft: '100px'}}>
          <MapWithASearchBox />

          <h1>_______________</h1>
          <input
            type="text"
            name="activitySearch"
            value={this.state.activitySearch}
            onChange={this.handleChange}
            placeholder="Search for Activity"
          />

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="activityName" />
            <input
              type="text"
              name="activityName"
              value={this.state.activityName}
              onChange={this.handleChange}
              placeholder="Name of Activity"
            />

            <label htmlFor="activityLocation" />
            <input
              type="text"
              name="activityLocation"
              value={this.state.activityLocation}
              onChange={this.handleChange}
              placeholder="location"
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

        <div style={{textAlign: 'right', margin: '0px auto 0px auto'}}>
          activities will go here by day
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  trip: state.trip.selected
})

const mapDispatchToProps = dispatch => {
  return {
    send: (obj, tripId) => dispatch(sendActivityInfo(obj, tripId)),
    fetchActivities: () => dispatch(fetchActivities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities)
