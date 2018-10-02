import React, {Component} from 'react'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import Sidebar from './Sidebar'
import {connect} from 'react-redux'

class Itinerary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityName: '',
      activitySearch: '',
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

  handleSubmit() {}

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    console.log('state is', this.state)

    return (
      <div>
        <Sidebar />
        <div style={{marginLeft: '100px'}}>
          <h1>Activity form will go here</h1>
          <img src="images/mexico-city-map.jpg" width="50%" />
          <h1>_______________</h1>
          <input
            type="text"
            name="activitySearch"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Search for Activity"
          />

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="activityName" />
            <input
              type="text"
              name="activityName"
              value={this.state.name}
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
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    send: obj => dispatch(sendItineraryInfo(obj))
  }
}

export default connect(mapStateToProps)(Itinerary)
