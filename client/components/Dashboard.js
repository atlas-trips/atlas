import React from 'react';
import { connect } from 'react-redux';

const dummyData = [
  {
    name: 'Vegas',
    startDate: '2018-09-10 00:00:00',
    endDate: '2018-10-13 00:00:00',
  },
  {
    name: 'Cali',
    startDate: '2018-12-10 00:00:00',
    endDate: '2018-12-13 00:00:00',
  },
  {
    name: 'Japan',
    startDate: '2019-1-10 00:00:00',
    endDate: '2019-1-13 00:00:00',
  },
]

const getTime = () => {
  const currentTime = new Date();
  let day = currentTime.getDate();
  let month = currentTime.getMonth()+1;
  const year = currentTime.getFullYear();
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  return `${year}-${month}-${day}`;
}

const singleTrip = trips => {
  const now = getTime();
  return trips.filter(trip => {
    const tripStart = trip.startDate.split(' ')[0];
    const tripEnd = trip.endDate.split(' ')[0];
    return (now >= tripStart && now <= tripEnd)
  })
}

const Dashboard = (props) => {
  const { user } = props;
  const onATrip = singleTrip(dummyData).length;
  return onATrip ? (
    <div>
      <h1>{user.name}'s Trip:</h1>
      <h3>Replace this whole section with a single trip component</h3>
      <h5>I'd recommend passing in singleTrip(dummyData) as props for the trip</h5>
    </div>
  ) : (
    <div>
      <h1>{user.name}'s upcoming trips:</h1>
      <h3>Replace this whole section with multiple trips component</h3>
      <h5>Realistically we'll get all trips from state, for now I guess use dummy data</h5>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(Dashboard);
