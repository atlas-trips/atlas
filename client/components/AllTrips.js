import React from 'react';
import {connect} from 'react-redux';

const divStyle = {

};

const AllTrips = props => {
  const trips = props.trips;

  return !trips.length ? null : (
    <div className="all-trips">
      {trips.map(trip => {
        return (
          <div
          key={trip.name}
          className="all-trips-trip"
          onClick={evt => props.click(evt, trip.id)}
          >
            <img src="/images/default.png" width="360" alt="" className="all-trips-trip-image"/>
            <div className="all-trips-trip-filter">
              <p className="all-trips-trip-name">{trip.name}</p>
            </div>
            <h2><span className="all-trips-trip-when">When:</span></h2>
            <h2>
              {new Date(trip.startDate).toString().slice(0,16)} <br/> to <br/>{new Date(trip.endDate).toString().slice(0, 16)}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AllTrips);
