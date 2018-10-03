import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
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
const defaultPath = '/dashboard'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(evt, selected) {
    evt.preventDefault()
    if (!selected) {
      alert('Please Select a Trip First')
    }
  }

  render() {
    const selected = Object.keys(this.props.selected).length !== 0
    return (
      <div style={tempSidebarStyles}>
        <div style={{...tempContainerStyles, marginTop: '150px'}}>
          <Link to={defaultPath}>
            <img src="/images/home.png" height="50" alt="home" />
          </Link>
        </div>
        <div
          style={tempContainerStyles}
          onClick={e => this.handleClick(e, selected)}
        >
          <Link to={selected ? '/accommodations' : defaultPath}>
            <img src="/images/bed.png" height="50" alt="bed" />
          </Link>
        </div>
        <div
          style={tempContainerStyles}
          onClick={e => this.handleClick(e, selected)}
        >
          <Link to={selected ? '/travel' : defaultPath}>
            <img src="/images/plane.png" height="50" alt="plane" />
          </Link>
        </div>
        <div
          style={tempContainerStyles}
          onClick={e => this.handleClick(e, selected)}
        >
          <Link to={selected ? '/calendar' : defaultPath}>
            <img src="/images/calendar.png" height="50" alt="calendar" />
          </Link>
        </div>
        <div
          style={tempContainerStyles}
          onClick={e => this.handleClick(e, selected)}
        >
          <Link to={selected ? '/activities' : defaultPath}>
            <img src="/images/activity.png" height="50" alt="activity" />
          </Link>
        </div>
        <div
          style={{...tempContainerStyles, marginBottom: '100px'}}
          onClick={e => this.handleClick(e, selected)}
        >
          <Link to={selected ? '/expenses' : defaultPath}>
            <img src="/images/money.png" height="50" alt="money" />
          </Link>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  selected: state.trip.selected
})

export default connect(mapState, null)(Sidebar)
