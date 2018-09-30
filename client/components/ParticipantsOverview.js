import React from 'react';
import { userInfo } from 'os';

const dummyData = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@email.com',
  },
  {
    id: 2,
    name: 'Fred',
    email: 'fred@email.com',
  },
  {
    id: 3,
    name: 'Jamie',
    email: 'jamie@email.com',
  },
  {
    id: 4,
    name: 'Kate',
    email: 'kate@email.com',
  }
]

const tempStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
}

const tempPersonStyles = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px',
}

const ParticipantsOverview = () => {
  return (
    <div style={{textAlign: 'center', width: '300px', border: '1px solid black',
    marginTop: '50px',}}>
      <h4>Who's coming:</h4>
      <div style={tempStyles}>
        {dummyData.map(person => {
          return (
            <div style={tempPersonStyles} key={person.id}>
              <img src="/images/person.png" width='50' alt="person icon"/>
              <a href={`mailto:${person.email}`}>{person.name}</a>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default ParticipantsOverview;
