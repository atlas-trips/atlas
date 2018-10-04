import React, { Component } from 'react';
import Sidebar from './Sidebar'
import { getTripCalendar } from '../store/trip';
import { connect } from 'react-redux';
import CalendarActivities from './CalendarActivities';
import CalendarAccommodations from './CalendarAccommodations';
import CalendarTransportation from './CalendarTransportation';

const sectionStyle = {
  border: '1px solid black',
  width: '200px',
  textAlign: 'center',
  height: '200px',
}

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSchedule(this.props.trip.id);
  }

  render() {
    const { schedule } = this.props;
    return schedule.length ? (
      <div>
        <Sidebar />
        <div style={{marginLeft: '100px', display: 'flex', flexDirection: 'column'}}>
          {schedule.map((day,i) => {
            return (
              <div key={day.date+i} style={{display: 'flex', border: '1px solid red'}}>
                <div style={{border: '1px solid black', width: '130px', height: '200px'}}>
                  <h3>{day.date}</h3>
                </div>
                {day.hasOwnProperty('activities') ? (
                  <div style={sectionStyle}>
                    <h4>Activities:</h4>
                    <CalendarActivities activities={day.activities}/>
                  </div> )
                : null}
                {day.hasOwnProperty('accommodations') ? (
                  <div style={sectionStyle}>
                    <h4>New Accommodations:</h4>
                    <CalendarAccommodations accommodations={day.accommodations} />
                  </div> )
                : null}
                {day.hasOwnProperty('transportation') ? (
                  <div style={sectionStyle}>
                    <h4>Transportation:</h4>
                    <CalendarTransportation transportation={day.transportation}/>
                  </div> )
                : null}
              </div>
            )
          })}
        </div>
      </div>
    ) : (
      <div>
        <Sidebar />
        <div style={{marginLeft: '100px'}}>
          <h1>nothing currently scheduled...</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip.selected,
  schedule: state.trip.tripCalendar,
})

const mapDispatchToProps = dispatch => ({
  getSchedule: tripId => dispatch(getTripCalendar(tripId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
