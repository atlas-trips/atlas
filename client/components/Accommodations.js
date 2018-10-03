import React from 'react'
import Sidebar from './Sidebar'
import {fetchAccommodations} from '../store/accommodation'
import {connect} from 'react-redux'

class Accommodations extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchAccommodations()
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
                      <p>
                        {accom.startDate.slice(0, 10)} -{' '}
                        {accom.endDate.slice(0, 10)}
                      </p>
                    </div>
                  )
                })
              : 'No Accommodations Booked'}
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  accommodations: state.accommodation
})

const mapDispatch = dispatch => ({
  fetchAccommodations: () => dispatch(fetchAccommodations())
})

export default connect(mapState, mapDispatch)(Accommodations)
