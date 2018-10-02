import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchTransportation } from '../store/transportation';
import {
  Card,
  Container,
  Form,
  Input,
  Button,
  Dropdown
} from 'semantic-ui-react';

class Travel extends Component {
  state = {
    user: '',
    method: '',
    flightNum: '',
    date: ''
  };

  componentDidMount() {
    this.props.getTransportation();
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onPutSubmit = async event => {
    event.preventDefault();

    await axios.put(
      `/api/transportation/${this.props.seletctedTrip.id}/${
        this.state.user.id
      }`,
      this.state
    );
  };

  onPostSubmit = async event => {
    event.preventDefault();

    await axios.post(
      `/api/transportation/${this.props.selectedTrip.id}/${this.state.user.id}`,
      this.state
    );
  };

  render() {
    const items = this.props.transportation.map(transport => {
      return {
        header: transport.user.name,
        meta:
          transport.method +
          (transport.flightNum ? ` - ${transport.flightNum}` : ''),
        description: transport.date.toString()
      };
    });

    const users = this.props.transportation.map(transport => transport.user);

    return (
      <div>
        <Sidebar />
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"
        />
        <Container>
          <Card.Group items={items} />
          <Form>
            <Dropdown placeholder="Select User" selection options={users} />

            <Form.Field>
              <label>Method</label>
              <Input
                name="method"
                onChange={this.onChange}
                value={this.state.method}
              />
            </Form.Field>
            <Form.Field>
              <label>Flight Number</label>
              <Input
                name="flightNum"
                onChange={this.onChange}
                value={this.state.flightNum}
              />
            </Form.Field>
            <Form.Field>
              <label>Date</label>
              <Input
                name="date"
                onChange={this.onChange}
                value={this.state.date}
              />
            </Form.Field>
            <Button onClick={this.onPutSubmit} primary>
              Update
            </Button>
            <Button onClick={this.onPostSubmit} prinary>
              Add
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapState = state => ({ selectedTrip: state.trip });

const mapDispatch = dispatch => ({
  getTransportation: tripId => dispatch(fetchTransportation(tripId))
});

export default connect(mapState, mapDispatch)(Travel);
