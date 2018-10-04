import React from 'react';

const CalendarActivities = (props) => {
  const { activities } = props;
  return (
    <div>
      {activities.map(act => {
        return (
        <div key={act.id} >
          <h5>{act.name}</h5>
          {act.users.map((user,i) => <h6 key={i}>{user}</h6>)}
        </div>)
      })}
    </div>
  );
};

export default CalendarActivities;
