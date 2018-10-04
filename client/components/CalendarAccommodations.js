import React from 'react';

const CalendarAccommodations = (props) => {
  const { accommodations } = props;
  return (
    <div>
      {accommodations.map(acc => {
        return (
        <div key={acc.id} >
          <h5>{acc.name}</h5>
          {/* {acc.users.map((user,i) => <h6 key={i}>{user}</h6>)} */}
        </div>)
      })}
    </div>
  );
};

export default CalendarAccommodations;
