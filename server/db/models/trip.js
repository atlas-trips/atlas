const Sequelize = require('sequelize');
const db = require('../db');
const randomize = require('randomatic');

const Trip = db.define('trip', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  link: {
    type: Sequelize.STRING
  }
});

Trip.beforeCreate(newTrip => {
  newTrip.link = randomize('Aa0', 10);
});

module.exports = Trip;
