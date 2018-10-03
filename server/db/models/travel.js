const Sequelize = require('sequelize')
const db = require('../db')

const Travel = db.define('travel', {
  tripId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Travel
