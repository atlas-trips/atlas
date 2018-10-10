import React, {Component} from 'react';
import Sidebar from './Sidebar';
import {getTripCalendar} from '../store/trip';
import {connect} from 'react-redux';
import CalendarActivities from './CalendarActivities';
import CalendarAccommodations from './CalendarAccommodations';
import CalendarTransportation from './CalendarTransportation';
import {Link} from 'react-router-dom';

const getDayName = shortName => {
  if (shortName === 'Mon') {
    return 'Monday';
  } else if (shortName === 'Tue') {
    return 'Tuesday';
  } else if (shortName === 'Wed') {
    return 'Wednesday';
  } else if (shortName === 'Thu') {
    return 'Thursday';
  } else if (shortName === 'Fri') {
    return 'Friday';
  } else if (shortName === 'Sat') {
    return 'Saturday';
  } else {
    return 'Sunday';
  }
};

class Calendar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSchedule(this.props.trip.id);
  }

  render() {
    const {schedule} = this.props;
    return schedule.length ? (
      <div>
        <Sidebar />
        <div className="calendar">
          {schedule.map((day, i) => {
            const date = new Date(day.date).toString().split(' ');
            return (
              <div key={day.date + i} className="calendar-card">
                <div className="calendar-card-date">
                  <div className="calendar-card-date-month">{date[1]}</div>
                  <div className="calendar-card-date-day">
                    <div className="calendar-card-date-day-num">{date[2]}</div>
                    <div className="calendar-card-date-day-word">
                      {getDayName(date[0])}
                    </div>
                  </div>
                </div>
                <div className="calendar-card-container">
                  {day.hasOwnProperty('activities') ? (
                    <div className="calendar-card-container-content">
                      <div className="calendar-card-item-title">
                        Activities:
                      </div>
                      <CalendarActivities
                        activities={day.activities}
                        user={this.props.user.name}
                      />
                    </div>
                  ) : null}
                  {day.hasOwnProperty('accommodations') ? (
                    <div className="calendar-card-container-content">
                      <div className="calendar-card-item-title">
                        Accommodations:
                      </div>
                      <CalendarAccommodations
                        accommodations={day.accommodations}
                        user={this.props.user.name}
                      />
                    </div>
                  ) : null}
                  {day.hasOwnProperty('transportation') ? (
                    <div className="calendar-card-container-content">
                      <div className="calendar-card-item-title">
                        Transportation:
                      </div>
                      <CalendarTransportation
                        transportation={day.transportation}
                        user={this.props.user.name}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div>
        <Sidebar />
        <div className="no-calendar-container">
          <h3 className="no-calendar">Nothing currently scheduled...</h3>
          <Link className="no-calendar-link" to="/activities">
            Add an activity
          </Link>
          <Link className="no-calendar-link" to="/accommodations">
            Add an accommodation
          </Link>
          <Link className="no-calendar-link" to="/travel">
            Add transportation
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip.selected,
  schedule: state.trip.tripCalendar,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getSchedule: tripId => dispatch(getTripCalendar(tripId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
