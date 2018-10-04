const Sequelize = require('sequelize');
const db = require('../db');

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
  }
});

module.exports = Trip;
