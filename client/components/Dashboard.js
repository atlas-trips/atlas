import React from 'react'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'
import AllTrips from './AllTrips'
import SingleTrip from './SingleTrip'
import {fetchTrips, fetchSelected} from '../store/trip' 
import { throws } from 'assert';

const dummyData = [
  {
    name: 'Vegas',
    startDate: '2018-09-01 00:00:00',
    endDate: '2018-10-13 00:00:00'
  },
  {
    name: 'Cali',
    startDate: '2018-12-10 00:00:00',
    endDate: '2018-12-13 00:00:00'
  },
  {
    name: 'Japan',
    startDate: '2019-1-10 00:00:00',
    endDate: '2019-1-13 00:00:00'
  }
]

/*
const getTime = () => {
  const currentTime = new Date()
  let day = currentTime.getDate()
  let month = currentTime.getMonth() + 1
  const year = currentTime.getFullYear()
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  return `${year}-${month}-${day}`
}

const singleTrip = trips => {
  const now = getTime()
  return trips.filter(trip => {
    const tripStart = trip.startDate.split(' ')[0]
    const tripEnd = trip.endDate.split(' ')[0]
    return now >= tripStart && now <= tripEnd
  })
}
*/

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  componentDidMount(){
    this.props.fetchTrips(this.props.user.id)
  }

  async handleClick(evt, id){
    evt.preventDefault();
    await this.props.fetchSelected(id);
    this.setState({selected: true});
  }

  goBack(evt){
    evt.preventDefault()
    this.setState({selected: false})
  }
  
  render(){
    const {user} = this.props;
    //const onATrip = false //Object.keys(this.props.selected).length;
    if(this.props.trips.length > 0){
      return (
       <div style={{display: 'flex', marginLeft: '100px'}}>
        <Sidebar />
        <div style={{margin: '0 auto'}}>
         
          {this.state.selected ? (
            <div className='selected-trip'>
               <a href="/dashboard" onClick={this.goBack} ><h4>{'< Back'}</h4></a>
              <h3>{user.name}'s Trip:</h3>
              <SingleTrip trip={this.props.selected} />
            </div>
          ) : (
            <AllTrips trips={this.props.trips} click={this.handleClick} />
          ) }       
        </div>
       </div>
      )
    } else {
      return(
        <div className='noTrips'>
          <Sidebar />
          <div className="noTrips-content">
            <h3>No Trips Available</h3>
          </div>
        </div>
      )
    }

  }
}

const mapStateToProps = state => ({
  user: state.user,
  trips: state.trip.all,
  selected: state.trip.selected
})

const mapDispatch = dispatch => ({
  fetchTrips: (id) => dispatch(fetchTrips(id)),
  fetchSelected: (tripId) => dispatch(fetchSelected(tripId))
})

export default connect(mapStateToProps, mapDispatch)(Dashboard)
