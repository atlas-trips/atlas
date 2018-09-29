import React from 'react'

const divStyle = {
  textAlign: 'center',
  border: '2px solid black',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '10px'
}

const SingleTrip = props => {
  const trip = props.trip[0]

  return (
    <span style={divStyle}>
      {trip.name}: {trip.startDate.slice(0, 10)} to {trip.endDate.slice(0, 10)}
    </span>
  )
}

export default SingleTrip
