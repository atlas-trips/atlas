const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  isDecided: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})

module.exports = Activity;
