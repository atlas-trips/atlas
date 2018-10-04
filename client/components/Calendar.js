import React, { Component } from 'react';
import Sidebar from './Sidebar'
import { getTripCalendar } from '../store/trip';
import { connect } from 'react-redux';
// import CalendarDay from './CalendarDay';

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
          {schedule.map(day => {
            return (
              <div key={day.id} style={{display: 'flex', border: '1px solid red'}}>
                <div style={{border: '1px solid black'}}>
                  <h3>{day.date}</h3>
                </div>
                {day.hasOwnProperty('activities') ? (
                  <div style={{border: '1px solid black'}}>
                    <h4>Activities:</h4>
                    {day.activities.map(act => {
                      return (
                      <div key={act.id} >
                        <h5>{act.name}</h5>
                        {act.users.map((user,i) => <h6 key={i}>{user}</h6>)}
                      </div>)
                    })}
                  </div> )
                : null}
                {day.hasOwnProperty('accommodations') ? (
                  <div style={{border: '1px solid black'}}>
                    <h4>New Accommodations:</h4>
                    {day.accommodations.map(acc => {
                      return (
                      <div key={acc.id} >
                        <h5>{acc.name}</h5>
                        {acc.users.map((user,i) => <h6 key={i}>{user}</h6>)}
                      </div>)
                    })}
                  </div> )
                : null}
                {day.hasOwnProperty('transportation') ? (
                  <div style={{border: '1px solid black'}}>
                    <h4>Transportation:</h4>
                    {day.transportation.map(trans => {
                      return (
                      <div key={trans.id} >
                        <h5>{trans.name}</h5>
                        {trans.users.map((user,i) => <h6 key={i}>{user}</h6>)}
                      </div>)
                    })}
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
