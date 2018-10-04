import React from 'react';

const CalendarTransportation = (props) => {
  const { transportation } = props;
  return (
    <div>
      {transportation.map(trans => {
        return (
        <div key={trans.id} >
          <h5>{trans.name}</h5>
          {/* {trans.users.map((user,i) => <h6 key={i}>{user}</h6>)} */}
        </div>)
      })}
    </div>
  );
};

export default CalendarTransportation;
