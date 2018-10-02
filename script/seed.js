'use strict'

const db = require('../server/db')
const {
  User,
  Trip,
  Activity,
  Expense,
  Transportation,
  Accommodation,
  Travel
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const cody = await User.create({
    email: 'cody@email.com',
    password: '123',
    name: 'Cody'
  })
  const murphy = await User.create({
    email: 'murphy@email.com',
    password: '123',
    name: 'Murphy'
  })
  const sam = await User.create({
    email: 'sam@email.com',
    password: '12345',
    name: 'Sam'
  })
  const jane = await User.create({
    email: 'jane@email.com',
    password: '12345',
    name: 'Jane'
  })
  const john = await User.create({
    email: 'John@email.com',
    password: '12345',
    name: 'John'
  })
  const elizabeth = await User.create({
    email: 'elizabeth@email.com',
    password: '12345',
    name: 'Elizabeth'
  })
  const gary = await User.create({
    email: 'gary@email.com',
    password: '12345',
    name: 'Gary'
  })
  const sally = await User.create({
    email: 'sally@email.com',
    password: '12345',
    name: 'Sally'
  })
  const jessica = await User.create({
    email: 'jessica@email.com',
    password: '12345',
    name: 'Jessica'
  })
  const matt = await User.create({
    email: 'matt@email.com',
    password: '12345',
    name: 'Matt'
  })
  const david = await User.create({
    email: 'david@email.com',
    password: '12345',
    name: 'David'
  })
  const fred = await User.create({
    email: 'fred@email.com',
    password: '12345',
    name: 'Fred'
  })
  const jessie = await User.create({
    email: 'jessie@email.com',
    password: '12345',
    name: 'Jessie'
  })

  const vegas = await Trip.create({
    name: 'Vegas',
    startDate: '2018-10-10 00:00:00',
    endDate: '2018-10-13 00:00:00'
  })
  const paris = await Trip.create({
    name: 'Paris',
    startDate: '2018-12-01 00:00:00',
    endDate: '2018-12-08 00:00:00'
  })
  const cancun = await Trip.create({
    name: 'Cancun',
    startDate: '2019-01-01 00:00:00',
    endDate: '2019-01-07 00:00:00'
  })
  const thailand = await Trip.create({
    name: 'Thailand',
    startDate: '2019-02-11 00:00:00',
    endDate: '2019-02-22 00:00:00'
  })
  const japan = await Trip.create({
    name: 'Japan',
    startDate: '2018-09-20 00:00:00',
    endDate: '2018-10-07 00:00:00'
  })
  const brasil = await Trip.create({
    name: 'Brasil',
    startDate: '2019-11-05 00:00:00',
    endDate: '2019-11-17 00:00:00'
  })
  const italy = await Trip.create({
    name: 'Italy',
    startDate: '2018-09-25 00:00:00',
    endDate: '2018-10-07 00:00:00'
  })

  const london = await Trip.create({
    name: 'London',
    startDate: '2020-09-25 00:00:00',
    endDate: '2020-10-07 00:00:00'
  })

  london.createUser({
    email: 'bob@email.com',
    password: '123456',
    name: 'Bob'
  })
  vegas.addUser(cody)
  vegas.addUser(murphy)
  paris.addUser(sam)
  cancun.addUser(john)
  thailand.addUser(jane)
  japan.addUser(gary)
  italy.addUser(jessica)

  const museum = await Activity.create({
    location: 'xxxxxxx',
    name: 'Museum',
    description: 'Looking at some paintings',
    date: '2018-12-02 00:00:00',
    isDecided: true,
    votes: 2,
    tripId: 2
  })
  const shopping = await Activity.create({
    location: 'xxxx',
    name: 'Venetian Shopping',
    description: 'Also riding around on boats and stuff',
    date: '2018-10-10 00:00:00',
    isDecided: true,
    votes: 2,
    tripId: 1
  })
  const beach = await Activity.create({
    location: 'xxxx',
    name: 'Beach',
    description: "I don't like sand",
    date: '2019-01-02 00:00:00',
    isDecided: true,
    votes: 1,
    tripId: 3
  })
  const eiffel = await Activity.create({
    location: 'xxxx',
    name: 'Eiffel Tower',
    description: 'Climb to the top, look at the city',
    date: '2018-12-05 00:00:00',
    isDecided: true,
    votes: 5,
    tripId: 2
  })
  const circus = await Activity.create({
    location: 'xxx',
    name: 'Cirque de Soleil',
    description: 'Ka - at MGM Grand',
    date: '2018-10-11 00:00:00',
    isDecided: true,
    votes: 1,
    tripId: 1
  })
  const spa = await Activity.create({
    location: 'xxxx',
    name: 'Spa',
    description: 'Get massages',
    date: '2019-01-05 00:00:00',
    isDecided: true,
    votes: 1,
    tripId: 3
  })
  const oldCity = await Activity.create({
    location: 'xxxx',
    name: 'Old City',
    description: 'Walk around and shop',
    date: '2019-01-06 00:00:00',
    isDecided: true,
    votes: 3,
    tripId: 3
  })
  const shooting = await Activity.create({
    location: 'xxxx',
    name: 'Shoot guns',
    description: 'Go shooting at range off the strip',
    date: '2018-10-12 00:00:00',
    isDecided: true,
    votes: 5,
    tripId: 1
  })
  const akb = await Activity.create({
    location: 'xxxx',
    name: 'Akihabara',
    description: 'Exploring and shopping',
    date: '2018-09-25 00:00:00',
    isDecided: true,
    votes: 1,
    tripId: 5
  })
  const babymetal = await Activity.create({
    location: 'xxxx',
    name: 'Babymetal concert',
    description: 'headbanging to metal jpop',
    date: '2019-09-26 00:00:00',
    isDecided: true,
    votes: 6,
    tripId: 5
  })
  const climbing = await Activity.create({
    location: 'xxxx',
    name: 'Rock Climbing',
    description: 'Tonsai roof at Tonsai bay',
    date: '2019-02-15 00:00:00',
    isDecided: true,
    votes: 8,
    tripId: 4
  })
  const market = await Activity.create({
    location: 'xxxx',
    name: 'Night market',
    description: 'Eat and explore in Krabi town',
    date: '2019-02-16 00:00:00',
    isDecided: true,
    votes: 5,
    tripId: 4
  })
  const carnival = await Activity.create({
    location: 'xxxx',
    name: 'Carnival',
    description: 'In Rio. All day long',
    date: '2019-11-12 00:00:00',
    isDecided: false,
    votes: 1,
    tripId: 6
  })
  const beachTwo = await Activity.create({
    location: 'xxxx',
    name: 'Chilling on the beach',
    description: 'recovering from Carnival',
    date: '2019-11-13 00:00:00',
    isDecided: true,
    votes: 7,
    tripId: 6
  })
  const pisa = await Activity.create({
    location: 'xxxx',
    name: 'Leaning Tower of Pisa',
    description: 'climbing until we reach the top',
    date: '2018-10-06 00:00:00',
    isDecided: true,
    votes: 5,
    tripId: 7
  })
  const florence = await Activity.create({
    location: 'xxxx',
    name: 'Walking across the Ponte Vecchio',
    description: 'more tourism in Firenze',
    date: '2018-10-04 00:00:00',
    isDecided: true,
    votes: 3,
    tripId: 7
  })
  const gladiator = await Activity.create({
    location: 'xxxx',
    name: 'Colosseum',
    description: "pretending we're in Gladiator",
    date: '2019-10-03 00:00:00',
    isDecided: false,
    votes: 1,
    tripId: 7
  })

  museum.addUser(sam)
  shopping.addUser(cody)
  shopping.addUser(murphy)
  circus.addUser(cody)
  shooting.addUser(cody)
  circus.addUser(murphy)
  shooting.addUser(murphy)
  spa.addUser(john)
  oldCity.addUser(john)
  akb.addUser(gary)
  babymetal.addUser(gary)
  climbing.addUser(jane)
  market.addUser(jane)
  pisa.addUser(jessica)
  florence.addUser(jessica)
  gladiator.addUser(jessica)

  const venetian = await Accommodation.create({
    name: 'The Venetian',
    startDate: '2018-10-10 04:05:02',
    endDate: '2018-10-13 04:05:02',
    location: 'Las Vegas Strip',
    userId: 1,
    tripId: 1
  })
  const temptation = await Accommodation.create({
    name: 'Temptation Cancun Resort',
    startDate: '2019-01-01 00:00:00',
    endDate: '2019-01-07 00:00:00',
    location:
      'Boulevard Kukulcan Km 3.5, Zona Hotelera, 77500 Cancún, Q.R., Mexico',
    userId: 5,
    tripId: 3
  })
  const leRoch = await Accommodation.create({
    name: 'Le Roch Hotel and Spa',
    startDate: '2018-12-01 00:00:00',
    endDate: '2018-12-08 00:00:00',
    location: '28 Rue Saint-Roch, Paris France 75001',
    userId: 3,
    tripId: 2
  })
  const tonsai = await Accommodation.create({
    name: 'Tonsai Bay Resort',
    startDate: '2019-02-11 00:00:00',
    endDate: '2019-02-22 00:00:00',
    location: 'Tonsai Bay',
    userId: 4,
    tripId: 4
  })
  const niwa = await Accommodation.create({
    name: 'Hotel Niwa Tokyo',
    startDate: '2018-09-20 00:00:00',
    endDate: '2018-10-07 00:00:00',
    location: '１丁目-1-16 神田三崎町 Chiyoda, Tokyo 101-0061, Japan',
    userId: 7,
    tripId: 5
  })
  const roma = await Accommodation.create({
    name: 'Excel Roma Montemario',
    startDate: '2019-10-03 00:00:00',
    endDate: '2019-10-04 00:00:00',
    location: 'Via degli Scolopi, 31, 00136 Roma RM, Italy',
    userId: 9,
    tripId: 7
  })

  venetian.addUser(cody)
  venetian.addUser(murphy)
  temptation.addUser(john)
  leRoch.addUser(sam)
  tonsai.addUser(jane)
  niwa.addUser(gary)
  roma.addUser(jessica)

  const car = await Transportation.create({
    method: 'Car',
    date: '2018-10-10 10:05:02',
    flightNum: null,
    userId: 1,
    tripId: 1
  })
  const parisFlight = await Transportation.create({
    method: 'Flight',
    date: '2018-12-01 06:30:00',
    flightNum: 'AF 19',
    userId: 3,
    tripId: 2
  })
  const japanFlight = await Transportation.create({
    method: 'Flight',
    date: '2018-09-20 11:20:00',
    flightNum: 'NH 109',
    userId: 7,
    tripId: 5
  })
  const thaiFlight = await Transportation.create({
    method: 'Flight',
    date: '2019-02-12 14:30:00',
    flightNum: 'FD 525',
    userId: 4,
    tripId: 4
  })
  const train = await Transportation.create({
    method: 'Train',
    date: '2019-10-02 15:50:00',
    flightNum: null,
    userId: 9,
    tripId: 7
  })

  const travels = await Promise.all([
    Travel.create({
      tripId: 1,
      userId: 1,
      transportationId: 1
    }),
    Travel.create({
      tripId: 1,
      userId: 2,
      transportationId: 1
    }),
    Travel.create({
      tripId: 2,
      userId: 3,
      transportationId: 2
    }),
    Travel.create({
      tripId: 5,
      userId: 7,
      transportationId: 3
    }),
    Travel.create({
      tripId: 4,
      userId: 4,
      transportationId: 4
    }),
    Travel.create({
      tripId: 7,
      userId: 9,
      transportationId: 5
    })
  ])

  const expenses = await Promise.all([
    Expense.create({
      name: 'Museum entry fee',
      amount: 30,
      activityId: 1,
      userId: 1,
      isPaid: false
    }),
    Expense.create({
      name: 'Bag from Gucci',
      amount: 250,
      activityId: 2,
      userId: 2,
      isPaid: true
    }),
    Expense.create({
      name: 'Ice cream',
      amount: 5,
      activityId: 3,
      userId: 3,
      isPaid: false
    }),
    Expense.create({
      name: 'entry',
      amount: 10,
      activityId: 4,
      userId: 3,
      isPaid: false
    }),
    Expense.create({
      name: 'Ticket',
      amount: 35,
      activityId: 5,
      userId: 3,
      isPaid: false
    }),
    Expense.create({
      name: 'Swedish Massage',
      amount: 15,
      activityId: 6,
      userId: 4,
      isPaid: true
    }),
    Expense.create({
      name: 'ammo',
      amount: 20,
      activityId: 8,
      userId: 6,
      isPaid: false
    })
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
