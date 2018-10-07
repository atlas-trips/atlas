import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivitiesOverview';
import AccommodationOverview from './AccommodationOverview';
import ShareTrip from './ShareTrip';
import {connect} from 'react-redux';
import {fetchSelected} from '../store/trip'
import Sidebar from './Sidebar'

const divStyle = {
  textAlign: 'center',
  border: '2px solid black',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '10px',
  marginRight: '15px',
  borderRadius: '15px'
};

class SingleTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(event) {
    this.setState({open: true});
  }

  async componentDidMount(){
    console.log('mounted')
    await this.props.fetchSelected(this.props.match.params.id) 
    console.log('loaded')
  }

  render() {
    const trip = this.props.trip;
    const {open} = this.state;
    if(Object.keys(this.props.trip).length){
      return (
        <div>
          <Sidebar />
          <span style={divStyle}>
            {trip.name}: {trip.startDate.slice(0, 10)} to{' '}
            {trip.endDate.slice(0, 10)}
          </span>
          <button
            style={{...divStyle, color: 'black'}}
            onClick={this.handleClick}
          >
            Invite your Friends {this.state.open ? <ShareTrip /> : null}
          </button>
  
          <span />
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <ParticipantsOverview peeps={trip.users} />
            <ActivitiesOverview activities={trip.activities} />
            <AccommodationOverview accommodations={trip.accommodation} />
          </div>
        </div>
      );
    } else {
      return ('')
    }
    
  }
}

const mapState = state => ({
  trip: state.trip.selected
})
const mapDispatch = dispatch => ({
  fetchSelected: tripId => dispatch(fetchSelected(tripId))
})

export default connect(mapState, mapDispatch)(SingleTrip);
