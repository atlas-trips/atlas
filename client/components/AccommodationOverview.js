import React from 'react';
import {Link} from 'react-router-dom';

const tempActivitiesStyles = {
  textAlign: 'center',
  margin: '3px'
};

const AccommodationOverview = props => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '300px',
        border: '1px solid black',
        marginTop: '50px'
      }}
    >
      <h4>Accommodations:</h4>
      {props.accommodations.filter((item, idx) => idx < 3).map(accom => {
        return (
          <div style={tempActivitiesStyles} key={accom.id}>
            {accom.name} - {accom.start}
          </div>
        );
      })}
      ...
      <Link to="/accommodations">See more</Link>
    </div>
  );
};

export default AccommodationOverview;
