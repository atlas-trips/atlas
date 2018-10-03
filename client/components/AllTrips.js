import React from 'react'
import {connect} from 'react-redux'

const containerStyle = {
  display: 'flex',
  flexDirection: 'row'
}

const divStyle = {
  display: 'flex',
  textAlign: 'center',
  border: '2px solid black',
  flexDirection: 'column',
  flexWrap: 'wrap',
  margin: '25px 10px 10px 5px',
  padding: '10px'
}

const AllTrips = props => {
  const trips = props.trips

  return !trips.length ? null : (
    <div style={containerStyle}>
      {trips.map(trip => {
        return (
          <div
            key={trip.name}
            style={divStyle}
            onClick={evt => props.click(evt, trip.id)}
          >
            <h1>{trip.name}</h1>
            <h2>
              {trip.startDate.slice(0, 10)} to {trip.endDate.slice(0, 10)}
            </h2>
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(AllTrips)
