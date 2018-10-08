import React from 'react';
import {Link} from 'react-router-dom';

const AccommodationOverview = props => {
  return (
    <div className="accommodation-container">
      <div className="accommodation-container-header">
        <span>Accommodations:</span>
      </div>
      {props.accommodations.filter((item, idx) => idx < 3).map(accom => {
        return (
          <div className="accommodation-container-list" key={accom.id}>
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
