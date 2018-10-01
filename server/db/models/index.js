const User = require('./user')
const Accommodation = require('./accommodation')
const Expense = require('./expense')
const Transportation = require('./transportation')
const Trip = require('./trip')
const Activity = require('./activity')
const Travel = require('./travel')

//join tables
User.belongsToMany(Trip, {through: 'subscription'});
Trip.belongsToMany(User, {through: 'subscription'});
User.belongsToMany(Accommodation, {through: 'booking'});
Accommodation.belongsToMany(User, {through: 'booking'});
User.belongsToMany(Transportation, {through: Travel, foreignKey: 'userId'});
Transportation.belongsToMany(User, {through: Travel, foreignKey: 'transportationId'});
Activity.belongsToMany(User, {through: 'plan'});
User.belongsToMany(Activity, {through: 'plan'});
//associations
Trip.hasMany(Activity)
Trip.hasMany(Accommodation)
Accommodation.belongsTo(Trip);
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
  Activity,
  Travel
}
