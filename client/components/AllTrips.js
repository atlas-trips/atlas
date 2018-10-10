import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const AllTrips = props => {
  const trips = props.trips;

  return !trips.length ? null : (
    <div className="all-trips-container">
      <Link to="/new">
        <button className="add-trip">ADD A TRIP</button>
      </Link>
      <div className="all-trips">
        {trips.map(trip => {
          return (
            <Link to={`/trip/${trip.id}`} key={trip.name}>
              <div className="all-trips-trip">
                <img
                  src={
                    trip.name.toLowerCase() === 'cancun' ||
                    trip.name.toLowerCase() === 'vegas' ||
                    trip.name.toLowerCase() === 'japan' ||
                    trip.name.toLowerCase() === 'paris'
                      ? `/images/${trip.name.toLowerCase()}.jpg`
                      : `/images/default.jpg`
                  }
                  width="360"
                  alt=""
                  className="all-trips-trip-image"
                />
                <p className="all-trips-trip-name">{trip.name.toUpperCase()}</p>
                <div className="all-trips-info">
                  <div>
                    <p className="all-trips-trip-when">
                      START: <br />
                      {new Date(trip.startDate).toString().slice(0, 16)}
                    </p>
                  </div>
                  <div className="all-trips-trip-more">
                    <p>
                      CLICK TO <br /> SEE MORE
                    </p>
                  </div>
                  <div>
                    <p className="all-trips-trip-when">
                      END: <br />
                      {new Date(trip.endDate).toString().slice(0, 16)}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AllTrips);
