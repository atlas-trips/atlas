const Sequelize = require('sequelize');
const db = require('../db');

const Transportation = db.define('transportation', {
  method: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE
  },
  flightNum: {
    type: Sequelize.STRING
  }
});

module.exports = Transportation;
