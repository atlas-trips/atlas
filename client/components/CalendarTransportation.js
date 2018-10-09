import React from 'react';

const CalendarTransportation = props => {
  const {transportation} = props;
  return (
    <div>
      {transportation.map(trans => {
        return (
          <div key={trans.id} className="trans-card-single-trans">
            <div className="trans-card-single-trans-info-container">
              <div className="trans-card-single-trans-info">
                {trans.users.includes(props.user) ? (
                  <img src="/images/greenDot.png" width="8" alt="" />
                ) : (
                  <img src="/images/blackDot.png" width="8" alt="" />
                )}
                {' ' + trans.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarTransportation;
