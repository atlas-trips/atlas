import React from 'react';
import Sidebar from '../Sidebar';
import {getAccommodations, deleteAccommodation} from '../../store/accommodation';
import {connect} from 'react-redux';
import AccommodationForm from './AccommodationForm';
import Header from '../Header';

class Accommodations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adding: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick() {
    this.setState({
      adding: !this.state.adding
    });
  }

  handleDelete(accomId) {
    this.props.deleteAccommodation(accomId);
  }

  async componentDidMount() {
    if (this.props.trip.id) {
      const tripId = this.props.trip.id;
      await this.props.getAccommodations(tripId);
    }
  }
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        {this.state.adding ? (
          <AccommodationForm handleClick={this.handleClick} />
        ) : (
          <div className="accom-container">
            <div className="accom-header">
              <div>
                <span style={{marginLeft: '8px'}}>Atlas</span>
              </div>
              <div>
                <span style={{marginRight: '8px'}}>
                  {this.props.trip.name} Accommodations
                </span>
              </div>
            </div>
            <div className="accom-card-container">
              {this.props.accommodations.length > 0 ? (
                this.props.accommodations.map(accom => {
                  return (
                    <div className="accom-card" key={`accom${accom.id}`}>
                      <div className="accom-card-color">
                        <h4>{accom.name}</h4>
                        <img src="/images/bed.png" width="80" alt="" />
                      </div>
                      <div className="accom-card-info">
                        <span className="accom-card-info-title">Location:</span>
                        <span>{accom.location}</span>
                        <span className="accom-card-info-title">From:</span>
                        {new Date(accom.startDate).toString().slice(0, 16)}
                        <span className="accom-card-info-title">To:</span>
                        {new Date(accom.endDate).toString().slice(0, 16)}
                        <div className="accom-card-delete">
                          <button onClick={() => this.handleDelete(accom.id)}>
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h2>No Accommodations Booked</h2>
              )}
            </div>
            <div onClick={this.handleClick} className="accommo-form-add">
              <div className="accommo-form-add-plus">+</div>
              <div className="accommo-form-add-text">
                Create New Accommodation
              </div>
            </div>
            <br />
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  accommodations: state.accommodation.accommodations,
  trip: state.trip.selected
});

const mapDispatch = dispatch => ({
  getAccommodations: tripId => dispatch(getAccommodations(tripId)),
  deleteAccommodation: accomId => dispatch(deleteAccommodation(accomId))
});

export default connect(mapState, mapDispatch)(Accommodations);
