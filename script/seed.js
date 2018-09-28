'use strict'

const db = require('../server/db')
const {User, Trip, Activity, Expense, Transportation, Accomodation } = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', name: 'Cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'Murphy'}),
    User.create({email: 'bob@email.com', password: '12345', name: 'Bob'})
  ])

  const trips = await Promise.all([
    Trip.create({name: 'Vegas', startDate: '2018-10-10 00:00:00', endDate: '2018-10-13 00:00:00' }),
    Trip.create({name: 'Paris', startDate: '2018-12-01 00:00:00', endDate: '2018-12-08 00:00:00'}),
    Trip.create({name: 'Cancun', startDate: '2019-01-01 00:00:00', endDate: '2019-01-07 00:00:00'})
  ])

  const activities = await Promise.all([
    Activity.create({location: 'xxxxxxx', name: 'Museum', description: 'Looking at some paintings', date:'2018-12-02 00:00:00', isDecided: true, votes: 2, tripId: 2 }),
    Activity.create({location: 'xxxx', name: 'The Venetian', description: 'Boats and stuff', date: '2018-10-10 00:00:00', isDecided: true, votes: 2, tripId: 1 }),
    Activity.create({location: 'xxxx', name: 'Beach', description: "I don't like sand", date: '2019-01-02 00:00:00', isDecided: true, votes: 1, tripId: 3  })
  ])

  const accommmodations = await Promise.all([
    Accommodation.create({name: 'Hotel', startDate: '2016-08-09 04:05:02', endDate: '2016-08-11 04:05:02', location: 'Brazil', userId: 1, tripId: 1}),
    Accommodation.create({name: 'Car rental', startDate: '2017-08-09 04:05:02', endDate: '2017-09-19 04:05:02', location: 'California', userId: 2, tripId: 2}),
    Accommodation.create({name: 'Camping', startDate: '2018-08-09 04:05:02', endDate: '2018-08-15 04:05:02', location: 'Wyoming', userId: 3, tripId: 3}),
  ])

  const transportations = await Promise.all([
    Transportation.create({method: 'Flight', date: '2016-08-09 04:05:02', flightNum: 187, userId: 1, tripId: 1}),
    Transportation.create({method: 'Car', date: '2017-08-09 04:05:02', flightNum: null, userId: 2, tripId: 2}),
    Transportation.create({method: 'Bus', date: '2018-08-09 04:05:02', flightNum: null, userId: 3, tripId: 3})
  ])

  const expenses = await Promise.all([
    Expense.create({name: 'Burger King', amount: 30, activityId: 1, userId: 1, isPaid: false}),
    Expense.create({name: 'McDonald\'s', amount: 25, activityId: 2, userId: 2, isPaid: false}),
    Expense.create({name: 'Ice cream', amount: 15, activityId: 3, userId: 3, isPaid: false})
  ])


  console.log(`seeded successfully`)




}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
