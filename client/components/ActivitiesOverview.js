import React from 'react'
import {Link} from 'react-router-dom'

const dummyData = [
  {
    id: 1,
    name: 'Beach',
    description: 'Getting sunburnt'
  },
  {
    id: 2,
    name: 'Museum',
    description: 'Looking at art'
  },
  {
    id: 3,
    name: 'Hiking',
    description: 'Getting tired'
  },
  {
    id: 4,
    name: 'Climbing Leaning Tower of Pisa',
    description: 'Getting dizzy'
  },
  {
    id: 5,
    name: 'Casino',
    description: 'Losing rest of trip funds'
  }
]

const tempActivitiesStyles = {
  textAlign: 'center',
  margin: '3px'
}

const ActivitiesOverview = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        width: '300px',
        border: '1px solid black',
        marginTop: '50px'
      }}
    >
      <h4>Activities:</h4>
      {dummyData.filter((item, idx) => idx < 3).map(activity => {
        return (
          <div style={tempActivitiesStyles} key={activity.id}>
            {activity.name} - {activity.description}
          </div>
        )
      })}
      ...
      <Link to="/itinerary">See more</Link>
    </div>
  )
}

export default ActivitiesOverview
