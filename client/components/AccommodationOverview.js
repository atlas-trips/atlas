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
            <span>{accom.name}</span>
          </div>
        );
      })}
      <br/>
      <Link to="/accommodations">Add Accommodations</Link>
    </div>
  );
};

export default AccommodationOverview;
