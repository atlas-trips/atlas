import React from 'react';

const ParticipantsOverview = props => {
  return (
    <div className="participants-container">
      <div className="participants-pic-container">
        <img src="/images/group.png" className="participants-pic" alt="" />
      </div>
      <div className="participants-container-header">
        <span>Who's Coming:</span>
      </div>
      <div className="participants-container-bottom">
        {props.peeps.map(person => {
          return (
            <div
              className="participants-container-bottom-single"
              key={person.id}
            >
              <h3>{person.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsOverview;
