import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const AllTrips = props => {
  const trips = props.trips;

  return !trips.length ? null : (
    <div className="all-trips-container">
      <Link to="/new">
        <button className="add-trip">ADD A TRIP +</button>
      </Link>
      <div className="all-trips">
        {trips.map(trip => {
          return (
            <div
              key={trip.name}
              className="all-trips-trip"
              onClick={evt => props.click(evt, trip.id)}
            >
              <img
                src={`/images/${trip.name.toLowerCase()}.jpg`}
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
