import React from 'react'
import ParticipantsOverview from './ParticipantsOverview'
import ActivitiesOverview from './ActivitiesOverview'
import AccommodationOverview from './AccommodationOverview'

const divStyle = {
  textAlign: 'center',
  border: '2px solid black',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '10px'
}

const SingleTrip = props => {
  const trip = props.trip
  return (
    <div>
      <span style={divStyle}>
        {trip.name}: {trip.startDate.slice(0, 10)} to{' '}
        {trip.endDate.slice(0, 10)}
      </span>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <ParticipantsOverview peeps={trip.users} />
        <ActivitiesOverview activities={trip.activities} />
        <AccommodationOverview accommodations={trip.accommodation} />
      </div>
    </div>
  )
}

export default SingleTrip
