import React from 'react';

const CalendarActivities = props => {
  const {activities} = props;
  return (
    <div>
      {activities.map(act => {
        return (
          <div key={act.id} className="activity-card-single-activity">
            <div className="activity-card-single-activity-info-container">
              <div className="activity-card-single-activity-info">
                {act.users.includes(props.user) ? (
                  <img src="/images/greenDot.png" width="8" alt="" />
                ) : (
                  <img src="/images/blackDot.png" width="8" alt="" />
                )}
                {' ' + act.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarActivities;
