import React from 'react';
import {Link} from 'react-router-dom';

const tempActivitiesStyles = {
  textAlign: 'center',
  margin: '3px'
};

const ActivitiesOverview = props => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '300px',
        border: '1px solid black',
        marginTop: '50px'
      }}
    >
      <h4>Activities:</h4>
      {props.activities.filter((item, idx) => idx < 3).map(activity => {
        return (
          <div style={tempActivitiesStyles} key={activity.id}>
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
