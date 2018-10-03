import React from 'react'
import Sidebar from './Sidebar'
import {getAccommodations} from '../store/accommodation'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Accommodations extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const tripId = this.props.trip.id
    this.props.getAccommodations(tripId)
  }
  render() {
    return (
      <div>
        <Sidebar />
        <div style={{marginLeft: '100px'}}>
          <h1>accommodations go here</h1>
          <br />
          <div className="accommodation-container">
            {this.props.accommodations.length > 0
              ? this.props.accommodations.map(accom => {
                  return (
                    <div
                      className="single-accomodation"
                      key={`accom${accom.id}`}
                    >
                      <h4>{accom.name}</h4>
                      <h5>{accom.location}</h5>
                      <p>
                        {accom.startDate.slice(0, 10)} -{' '}
                        {accom.endDate.slice(0, 10)}
                      </p>
                    </div>
                  )
                })
              : 'No Accommodations Booked'}
          </div>
          <Link to="/addaccommodation">Add a new accommodation:</Link>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  accommodations: state.accommodation.accommodations,
  trip: state.trip.selected
})

const mapDispatch = dispatch => ({
  getAccommodations: tripId => dispatch(getAccommodations(tripId))
})

export default connect(mapState, mapDispatch)(Accommodations)
