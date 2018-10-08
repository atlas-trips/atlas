import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const defaultPath = '/dashboard';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(evt, selected) {
    evt.preventDefault();
    if (!selected) {
      alert('Please Select a Trip First');
    }
  }

  render() {
    const selected = Object.keys(this.props.selected).length !== 0;
    return !selected ? (
      <div className="sidebar-minimal">
        <div className="sidebar-item side-top">
          <Link style={{fontSize: '9px'}} to="/">
            Sign Out
          </Link>
        </div>
        <div className="sidebar-item ">
          <Link to={defaultPath}>
            <img src="/images/home.png" height="40" alt="home" />
          </Link>
        </div>
      </div>
    ) : (
      <div className="sidebar">
        <div>
          <div className="sidebar-item side-top">
            <Link style={{fontSize: '9px'}} to="/">
              Sign Out
            </Link>
          </div>
          <div className="sidebar-item">
            <Link to={defaultPath}>
              <img src="/images/home.png" height="40" alt="home" />
            </Link>
          </div>
        </div>

        <div>
          <div
            className="sidebar-item"
            onClick={e => this.handleClick(e, selected)}
          >
            <Link to="/accommodations">
              <img src="/images/bed.png" height="40" alt="bed" />
            </Link>
          </div>
          <div
            className="sidebar-item"
            onClick={e => this.handleClick(e, selected)}
          >
            <Link to="/travel">
              <img src="/images/plane.png" height="40" alt="plane" />
            </Link>
          </div>
          <div
            className="sidebar-item"
            onClick={e => this.handleClick(e, selected)}
          >
            <Link to="/calendar">
              <img src="/images/calendar.png" height="40" alt="calendar" />
            </Link>
          </div>
          <div
            className="sidebar-item side-bottom"
            onClick={e => this.handleClick(e, selected)}
          >
            <Link to="/activities">
              <img src="/images/activity.png" height="40" alt="activity" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  selected: state.trip.selected
});

export default connect(mapState, null)(Sidebar);
