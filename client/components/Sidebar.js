import React from 'react'
import {Link} from 'react-router-dom'

const tempSidebarStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100px',
  height: '100%',
  marginRight: '50px',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 80,
  backgroundColor: 'yellow',
  alignItems: 'center'
}

const tempContainerStyles = {}

const Sidebar = () => {
  return (
    <div style={tempSidebarStyles}>
      <div style={{...tempContainerStyles, marginTop: '150px'}}>
        <Link to="/dashboard">
          <img src="/images/home.png" height="50" alt="home" />
        </Link>
      </div>
      <div style={tempContainerStyles}>
        <Link to="/accommodations">
          <img src="/images/bed.png" height="50" alt="bed" />
        </Link>
      </div>
      <div style={tempContainerStyles}>
        <Link to="/travel">
          <img src="/images/plane.png" height="50" alt="plane" />
        </Link>
      </div>
      <div style={tempContainerStyles}>
        <Link to="/calendar">
          <img src="/images/calendar.png" height="50" alt="calendar" />
        </Link>
      </div>
      <div style={tempContainerStyles}>
        <Link to="/itinerary">
          <img src="/images/activity.png" height="50" alt="activity" />
        </Link>
      </div>
      <div style={{...tempContainerStyles, marginBottom: '100px'}}>
        <Link to="/expenses">
          <img src="/images/money.png" height="50" alt="money" />
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
