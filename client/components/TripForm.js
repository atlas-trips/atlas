import React, { Component } from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import { connect } from 'react-redux';
import 'react-day-picker/lib/style.css';
import { makeTrip } from '../store/trip';

const helmetStyle = `
.Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
  background-color: #f0f8ff !important;
  color: #4a90e2;
}
.Selectable .DayPicker-Day {
  border-radius: 0 !important;
}
.Selectable .DayPicker-Day--start {
  border-top-left-radius: 50% !important;
  border-bottom-left-radius: 50% !important;
}
.Selectable .DayPicker-Day--end {
  border-top-right-radius: 50% !important;
  border-bottom-right-radius: 50% !important;
}
`

const formatDate = date => {
  const data = date.toLocaleDateString().split('/');
  let [ month, day, year ] = data;
  if (day.length === 1) {
    day = '0' + day;
  }
  if (month.length === 1) {
    month = '0' + day;
  }
  return `${year}-${month}-${day} 00:00:00`
}

class TripForm extends Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      tripName: '',
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState(this.getInitialState());
  }
  handleChange(event) {
    this.setState({
      tripName: event.target.value,
    })
  }
  handleSubmit() {
    if (this.state.from === undefined || this.state.to === undefined || this.state.tripName === '') {
      alert('You must include a trip name, a start date, and an end date');
      return;
    }
    const newTrip = {
      name: this.state.tripName,
      startDate: formatDate(this.state.from),
      endDate: formatDate(this.state.to)
    }
    this.props.makeTrip(newTrip);
  }
  render() {
    const { from, to, tripName } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <label htmlFor="tripName">Trip Name:</label>
          <input type="text" value={tripName} onChange={this.handleChange}/>
        </div>
        <div className="RangeExample">
          <p>
            {!from && !to && 'Please select the first day.'}
            {from && !to && 'Please select the last day.'}
            {from &&
              to &&
              `Selected from ${from.toLocaleDateString()} to
                  ${to.toLocaleDateString()}`}{' '}
            {from &&
              to && (
                <button className="link" onClick={this.handleResetClick}>
                  Reset
                </button>
              )}
          </p>
          <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
          />
          <Helmet>
            <style>{helmetStyle}</style>
          </Helmet>
        </div>
        <button onClick={this.handleSubmit}>Create New Trip</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  makeTrip: trip => dispatch(makeTrip(trip)),
})

export default connect(null, mapDispatchToProps)(TripForm);
