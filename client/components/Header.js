import React from 'react';
import {connect} from 'react-redux';

const Header = props => {
  return (
    <div className="header-header">
      <h1>Current Trip: {props.trip.name.toUpperCase()}</h1>
      {props.children}
    </div>
  );
};

const mapState = state => ({trip: state.trip.selected});

export default connect(mapState)(Header);
