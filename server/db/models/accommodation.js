const Sequelize = require('sequelize');
const db = require('../db');

const Accommodation = db.define('accommodation', {
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
  location: {
    type: Sequelize.STRING
  },
  coordinates: {
    type: Sequelize.STRING
  },
  placeId: {
    type: Sequelize.STRING
  }
});

module.exports = Accommodation;
