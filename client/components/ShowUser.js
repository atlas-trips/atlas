import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('user is', this.props.user)
    return !this.props.user.name ? null : (
      <div>
        <h1>Welcome {this.props.user.name}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(ShowUser);


