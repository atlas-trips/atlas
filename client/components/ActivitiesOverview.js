import React from 'react';
import {Link} from 'react-router-dom';

const ActivitiesOverview = props => {
  return (
    <div className="activities-container">
      <div className="activities-container-header">
        <span>Activities:</span>
      </div>
      {props.activities.filter((item, idx) => idx < 3).map(activity => {
        return (
          <div className="activities-container-list" key={activity.id}>
            {activity.name}
          </div>
        );
      })}
      ...
      <Link to="/activities">See more</Link>
    </div>
  );
};

export default ActivitiesOverview;
