import React, {Component} from 'react';
import ParticipantsOverview from './ParticipantsOverview';
import ActivitiesOverview from './ActivitiesOverview';
import AccommodationOverview from './AccommodationOverview';
import Modal from 'react-responsive-modal';
import ShareTrip from './ShareTrip';

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

  render() {
    const trip = this.props.trip;
    const {open} = this.state;
    console.log(this.props);

    return (
      <div>
        <span style={divStyle}>
          {trip.name}: {trip.startDate.slice(0, 10)} to{' '}
          {trip.endDate.slice(0, 10)}
        </span>
        <span style={{...divStyle, fontColor: 'white'}}>
          <button onClick={this.handleClick}>
            Invite your Friends {this.state.open ? <ShareTrip /> : null}
          </button>
        </span>

        <span />
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <ParticipantsOverview peeps={trip.users} />
          <ActivitiesOverview activities={trip.activities} />
          <AccommodationOverview accommodations={trip.accommodation} />
        </div>
      </div>
    );
  }
}

export default SingleTrip;
