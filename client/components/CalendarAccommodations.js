import React from 'react';

const CalendarAccommodations = props => {
  const {accommodations} = props;
  return (
    <div>
      {accommodations.map(acc => {
        return (
          <div key={acc.id} className="accom-card-single-accom">
            <div className="accom-card-single-accom-info-container">
              <div className="accom-card-single-accom-name">
                {acc.users.includes(props.user) ? (
                  <img src="/images/greenDot.png" width="8" alt="" />
                ) : (
                  <img src="/images/blackDot.png" width="8" alt="" />
                )}
                {' ' + acc.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarAccommodations;
