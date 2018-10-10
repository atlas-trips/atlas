import React from 'react';

const ParticipantsOverview = props => {
  return (
    <div className="participants-container">
      <div className="participants-container-header">
        <span>Who's coming:</span>
      </div>
      <div className="participants-container-bottom">
        {props.peeps.map(person => {
          return (
            <div
              className="participants-container-bottom-single"
              key={person.id}
            >
              <img
                src="/images/ninja.png"
                width="100"
                height="100"
                alt="person icon"
              />
              <a href={`mailto:${person.email}`}>{person.name}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantsOverview;
