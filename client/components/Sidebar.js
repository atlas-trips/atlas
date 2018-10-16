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
        <Link className="sidebar-signout" to="/">
          <div className="sidebar-item side-top">Sign Out</div>
        </Link>
        <Link to={defaultPath}>
          <div className="sidebar-item ">
            <img src="/images/home.png" height="40" alt="home" />
            <div className="sidebar-item-middle">
              <div className="sidebar-hover-text">My Trips</div>
            </div>
          </div>
        </Link>
      </div>
    ) : (
      <div className="sidebar">
        <div>
          <div className="sidebar-item side-top">
            <Link className="sidebar-signout" to="/">
              Sign Out
            </Link>
          </div>
          <Link to={defaultPath}>
            <div className="sidebar-item ">
              <img src="/images/home.png" height="40" alt="home" />
              <div className="sidebar-item-middle">
                <div className="sidebar-hover-text">My Trips</div>
              </div>
            </div>
          </Link>
        </div>

        <div>
          <Link to="/accommodations">
            <div className="sidebar-item ">
              <img src="/images/bed.png" height="40" alt="home" />
              <div className="sidebar-item-middle">
                <div className="sidebar-hover-text-large">Accommodations</div>
              </div>
            </div>
          </Link>
          <Link to="/travel">
            <div className="sidebar-item ">
              <img src="/images/plane.png" height="40" alt="home" />
              <div className="sidebar-item-middle">
                <div className="sidebar-hover-text-large">Transportation</div>
              </div>
            </div>
          </Link>
          <Link to="/calendar">
            <div className="sidebar-item ">
              <img src="/images/calendar.png" height="40" alt="home" />
              <div className="sidebar-item-middle">
                <div
                  style={{fontSize: '1em'}}
                  className="sidebar-hover-text-large"
                >
                  Calendar
                </div>
              </div>
            </div>
          </Link>
          <Link to="/activities">
            <div className="sidebar-item">
              <img src="/images/activity.png" height="40" alt="home" />
              <div className="sidebar-item-middle">
                <div
                  style={{fontSize: '1em'}}
                  className="sidebar-hover-text-large"
                >
                  Activities
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  selected: state.trip.selected
});

export default connect(mapState, null)(Sidebar);
