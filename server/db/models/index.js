const User = require('./user')
const Accommodation = require('./accommodation')
const Expense = require('./expense')
const Transportation = require('./transportation')
const Trip = require('./trip')
const Activity = require('./activity')

User.belongsToMany(Trip, {through: 'subscription'})
Trip.belongsToMany(User, {through: 'subscription'})
Trip.hasMany(Activity)
Activity.belongsTo(Trip)
Activity.hasMany(Expense)
Expense.belongsTo(Activity)
User.hasOne(Expense)
Expense.belongsTo(User)

module.exports = {
  User,
  Accommodation,
  Expense,
  Transportation,
  Trip,
  Activity
}
