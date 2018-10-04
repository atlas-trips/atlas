/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Dashboard from './Dashboard';

const adapter = new Adapter();
enzyme.configure({adapter});

describe('Dashboard', () => {
  let dashboard;

  beforeEach(() => {
    dashboard = shallow(<Dashboard email="cody@email.com" />);
  });

  xit('renders the email in an h3', () => {
    expect(Dashboard.find('h3').text()).to.be.equal('Welcome, cody@email.com');
  });
});
