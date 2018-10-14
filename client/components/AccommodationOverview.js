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
      <br />
      <Link to="/accommodations" style={{marginBottom: '5px'}}>
        <div className="accommo-form-add">
          <div className="accommo-form-add-plus">+</div>
          <div className="accommo-form-add-text">Create New Activity</div>
        </div>
      </Link>
    </div>
  );
};

export default AccommodationOverview;
