import React, {Component} from 'react';
import Helmet from 'react-helmet';
import DayPicker, {DateUtils} from 'react-day-picker';
import {connect} from 'react-redux';
import 'react-day-picker/lib/style.css';
import {makeTrip} from '../store/trip';
import Sidebar from './Sidebar';

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
`;

const formatDate = date => {
  const data = date.toLocaleDateString().split('/');
  let [month, day, year] = data;
  if (day.length === 1) {
    day = '0' + day;
  }
  return `${year}-${month}-${day} 00:00:00`;
};

class TripForm extends Component {
  static defaultProps = {
    numberOfMonths: 2
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      tripName: '',
      stageOne: true,
      stageTwo: false,
      stageThree: false,
      dateError: false,
    };
  }
  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }
  handleResetClick() {
    this.setState({
      from: undefined,
      to: undefined,
    });
  }
  handleChange(event) {
    this.setState({
      tripName: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    if (event.target.name === 'tripName') {
      this.setState({
        name: event.target.name.value,
        stageTwo: true,
        stageOne: false,
      });
    } else if (event.target.name === 'tripDate') {
        this.state.to && this.state.from ? this.setState({
          stageThree: true,
          stageTwo: false,
        }) : this.setState({
          dateError: true,
        })
    } else {
      const newTrip = {
        name: this.state.tripName,
        startDate: formatDate(this.state.from),
        endDate: formatDate(this.state.to)
      };
      this.props.makeTrip(newTrip);
      this.props.history.push('/dashboard');
    }
  }

  handleBackClick(page) {
    if (page === 'two') {
      this.setState({
        to: undefined,
        from: undefined,
        dateError: false,
        stageOne: true,
        stageTwo: false,
      })
    } else {
      this.setState({
        to: undefined,
        from: undefined,
        stageTwo: true,
        stageThree: false,
      })
    }
  }

  render() {
    const {from, to, tripName, stageOne, stageTwo, stageThree, dateError} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="trip-form-container">
        <Sidebar />
        <div className="trip-form">
          <div className="trip-form-title">
            <div
              className="trip-form-title-content"
            >
              Atlas
            </div>
            <div
              className="trip-form-title-content"
            >
              Add A Trip
            </div>
          </div>
          {stageOne && (
          <div className="trip-form-name">
            <form
              name="tripName"
              onSubmit={this.handleSubmit}
            >
              <div className="trip-form-label-input">
                <label className="trip-form-name-label" htmlFor="tripName">
                  Trip Name:
                </label>

                <input
                  type="text"
                  value={tripName}
                  onChange={this.handleChange}
                  className="trip-form-name-input"
                  autoFocus={true}
                  placeholder="name your trip..."
                  name="tripName"
                  autoFocus
                  required
                />
              </div>

              <button className="trip-form-submit">
                <div
                  className="trip-form-submit-text"
                >
                  SUBMIT
                </div>
              </button>
            </form>
          </div>
          )} {stageTwo && (
          <div>
            <div className="RangeExample">
              <p>
                {!from && !to && 'Please select the first day:'}
                {from && !to && 'Please select the last day:'}
                {from &&
                  to &&
                  `Selected from ${from.toLocaleDateString()} to
                      ${to.toLocaleDateString()}`}{' '}
                {from &&
                  to && (
                <button
                  className="link date-reset-button"
                  onClick={this.handleResetClick}
                >
                  Reset
                </button>
                )}
              </p>
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, {from, to}]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
              <Helmet>
                <style>{helmetStyle}</style>
              </Helmet>
            </div>
            <div>
              <div
                className="trip-form-buttons-container"
              >
                <button
                  onClick={() => this.handleBackClick('two')}
                  className="trip-form-submit-two"
                >
                  <div className="trip-form-submit-text">
                    GO BACK
                  </div>
                </button>
                <form
                  name="tripDate"
                  onSubmit={this.handleSubmit}
                >
                  <button className="trip-form-submit-two">
                    <div
                      className="trip-form-submit-text"
                    >
                      SUBMIT
                    </div>
                  </button>
                </form>
              </div>
              {dateError && <div style={{color: 'red'}}>
                You must supply a starting and ending date
              </div>}
            </div>
          </div>)}
          {stageThree && (
          <div className="stage-three-container">
            <div className="stage-three-info">
              <h1 className="stage-three-info-title">Tentative Trip:</h1>
              <h2>Name: {this.state.tripName}</h2>
              <h3>From: {from ? from.toString().slice(0,16) : null} to {to ? to.toString().slice(0,16) : null}</h3>
            </div>
            <div className="trip-submit-three-buttons">
              <button
                onClick={() => this.handleBackClick('three')}
                className="trip-form-submit-two"
              >
                <div className="trip-form-submit-text">
                  GO BACK
                </div>
              </button>
              <button
                onClick={this.handleSubmit} className="trip-form-submit-two"
              >
                <div
                  className="trip-form-submit-text"
                >
                  CREATE MY TRIP
                </div>
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  makeTrip: trip => dispatch(makeTrip(trip))
});

export default connect(null, mapDispatchToProps)(TripForm);
