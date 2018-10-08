import React, {Component} from 'react';
import Helmet from 'react-helmet';
import DayPicker, {DateUtils} from 'react-day-picker';
import {connect} from 'react-redux';
import 'react-day-picker/lib/style.css';
import {getNewAccommodation} from '../store/accommodation';
import Sidebar from './Sidebar';
import LocationSearchInput from './LocationSearchInput';

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

class AccommodationForm extends Component {
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
    this.handleSearch = this.handleSearch.bind(this);
  }
  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      location: '',
      name: ''
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
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSearch(name, location) {
    console.log('am i getting here')
    this.setState({
      location,
      name,
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.from === undefined ||
      this.state.to === undefined ||
      this.state.name === '' ||
      this.state.location === ''
    ) {
      alert(
        'You must include a location name, address, start date, and an end date'
      );
      return;
    }
    const newAccommodation = {
      name: this.state.name,
      location: this.state.location,
      startDate: formatDate(this.state.from),
      endDate: formatDate(this.state.to),
      tripId: this.props.trip.id
    };
    await this.props.makeAccommodation(newAccommodation);
    this.props.handleClick();
  }
  render() {
    const {from, to, name, location} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="accommo-form-container">
        <Sidebar />
        <div className="accommo-form">
          <div className="accommo-form-title">
            <div className="accommo-form-title-content">Atlas</div>
            <div className="accommo-form-title-content">
              Add An Accommodation
            </div>
          </div>
          <LocationSearchInput handleSearch={this.handleSearch}/>
          <div className="accommo-form-inputs">
            <label htmlFor="name" className="accommo-form-input-label">
              Accommodation Name:
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              className="accommo-form-text-input"
              autoFocus={true}
            />
          </div>
          <br />
          <div className="accommo-form-inputs">
            <label htmlFor="location" className="accommo-form-input-label">
              Accommodation Address:
            </label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={this.handleChange}
              className="accommo-form-text-input-loc"
            />
          </div>
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
          <button onClick={this.handleSubmit} className="accommo-form-submit">
            <div className="accommo-form-submit-text">SUBMIT</div>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trip: state.trip.selected
});

const mapDispatchToProps = dispatch => ({
  makeAccommodation: trip => dispatch(getNewAccommodation(trip))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationForm);
