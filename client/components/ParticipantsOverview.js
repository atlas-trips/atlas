import React from 'react'

const tempStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly'
}

const tempPersonStyles = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px'
}

const ParticipantsOverview = (props) => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '300px',
        border: '1px solid black',
        marginTop: '50px'
      }}
    >
      <h4>Who's coming:</h4>
      <div style={tempStyles}>
        {props.peeps.map(person => {
          return (
            <div style={tempPersonStyles} key={person.id}>
              <img src="/images/person.png" width="50" alt="person icon" />
              <a href={`mailto:${person.email}`}>{person.name}</a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ParticipantsOverview
