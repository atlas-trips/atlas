import React from 'react';
import {connect} from 'react-redux';

const Header = props => {
  return (
    <div className="header-header">
      <div>{props.trip.name.toUpperCase()}:</div>
      <div>
        {new Date(props.trip.startDate.slice(0, 10)).toString().slice(0, 16)} to{' '}
        {new Date(props.trip.endDate.slice(0, 10)).toString().slice(0, 16)}
      </div>
    </div>
  );
};

const mapState = state => ({trip: state.trip.selected});

export default connect(mapState)(Header);
