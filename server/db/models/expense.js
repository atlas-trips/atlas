const Sequelize = require('sequelize');
const db = require('../db');

const Expense = db.define('expense', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  isPaid: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Expense;
