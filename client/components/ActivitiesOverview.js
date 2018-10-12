import React from 'react';
import {Link} from 'react-router-dom';

const ActivitiesOverview = props => {
  return (
    <div className="activities-container">
      <div className="activities-container-header">
        <span>Activities:</span>
      </div>
      {props.activities.filter((item, idx) => idx < 5).map(activity => {
        return (
          <div className="activities-container-list" key={activity.id}>
            <span>{activity.name}</span>
          </div>
        );
      })}
      <br/>
      <Link to="/activities">Add Activities</Link>
    </div>
  );
};

export default ActivitiesOverview;
