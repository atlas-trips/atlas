const router = require('express').Router();
const {
  User,
  Trip,
  Accommodation,
  Activity,
  Transportation
} = require('../db/models');
const {cleanUp, makeCalendarArray} = require('./utils');
const nodemailer = require('nodemailer');
const {email, password} = require('../../secrets');

router.get('/', (req, res, next) => {
  res.status(418).send("I'm a lil teapot");
});

router.post('/', async (req, res, next) => {
  try {
    const {name, startDate, endDate} = req.body;
    const newTripObj = {
      name,
      startDate,
      endDate
    };
    const newTrip = await Trip.create(newTripObj);
    const user = await User.findById(req.user.id);
    user.addTrip(newTrip);
    res.status(201).send(newTrip);
  } catch (error) {
    next(error);
  }
});

//SHARE TRIP ROUTE

router.post('/share', async (req, res, next) => {
  console.log('in the share post route', req.body);

  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    port: 465,
    auth: {
      user: `${email}`,
      pass: `${password}`
    }
  });

  console.log('transporter', transporter);
  const mailOptions = {
    from: `${req.body.emailFrom}`,
    to: `${req.body.friendEmail}`,
    subject: `You've been invited to join ${req.body.personFrom}'s ${
      req.body.tripName
    } trip!`,
    text: `I think we need to reseed Heroku for link to register Join here - http://atlas-trips.herokuapp.com/join/${
      req.body.tripLink
    }`,
    replyTo: `${req.body.emailFrom}`
  };
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res);
    }
  });
});

router.get('/:id/activities', async (req, res, next) => {
  try {
    const tripId = Number(req.params.id);
    const isAuthorized = await getAuthorizedUsers(tripId);
    console.log(isAuthorized);
    if (req.user && isAuthorized[req.user.id]) {
      const activities = await Activity.findAll({
        where: {
          tripId
        }
      });
      res.send(activities);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id/activities', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).send('Bad Request');
    }
    const isAuthorized = await getAuthorizedUsers(id);
    if (req.user && isAuthorized[req.user.id]) {
      let newActivity = await Activity.create({
        location: req.body.location,
        name: req.body.name,
        date: req.body.date,
        tripId: req.body.tripId
      });

      res.status(201).send(newActivity);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/activities/:actId', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const actId = Number(req.params.actId);
    if (isNaN(id) || isNaN(actId)) {
      res.status(400).send('Bad Request');
    }
    const isAuthorized = await getAuthorizedUsers(id);
    if (req.user && isAuthorized[req.user.id]) {
      //DO STUFF HERE
      let act = await Activity.findById(actId);
      act = await act.destroy();
      res.status(204).send('No Content');
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).send('Bad Request');
    }
    const trip = await Trip.find({
      where: {id: id},
      include: [
        {model: User, include: [Transportation]},
        Accommodation,
        Activity,
        Transportation
      ]
    });
    if (!trip) {
      res.status(404).send('Not Found');
    }
    const isAuthorized = await getAuthorizedUsers(id);
    if (req.user && isAuthorized[req.user.id]) {
      res.json(trip);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id/accommodations', async (req, res, next) => {
  try {
    const tripId = req.params.id;
    const isAuthorized = await getAuthorizedUsers(tripId);
    if (req.user && isAuthorized[req.user.id]) {
      const accommodations = await Accommodation.findAll({
        where: {
          tripId
        }
      });
      res.send(accommodations);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/join/:uniqueLink', async (req, res, next) => {
  try {
    console.log('looking to find trip');
    const foundTrip = await Trip.findOne({
      where: {
        link: req.params.uniqueLink
      },
      include: [{model: User}]
    });
    res.send(foundTrip);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/all', async (req, res, next) => {
  try {
    const isAuthorized = await getAuthorizedUsers(req.params.id);
    if (req.user && isAuthorized[req.user.id]) {
      const tripId = req.params.id;
      const data = await Trip.findAll({
        where: {
          id: tripId
        },
        include: [
          {
            model: Accommodation,
            include: [
              {
                model: User
              }
            ]
          },
          {
            model: Activity,
            include: [
              {
                model: User
              }
            ]
          },
          {
            model: Transportation,
            include: [
              {
                model: User
              }
            ]
          }
        ]
      });
      const cleanedData = cleanUp(data);
      const calArray = makeCalendarArray(cleanedData);
      res.send(calArray);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/:id/notification', async (req, res, next) => {
  const {users} = req.body;
  // let email = '';
  // users.forEach(user => {
  //   email += user.email + ', ';
  // })
  const transporter = nodemailer.createTransport({
    service: 'yahoo',
    port: 465,
    auth: {
      user: `${email}`,
      pass: `${password}`
    }
  });
  const mailOptions = {
    from: `${email}`,
    to: users.map(user => `${user.email}`),
    subject: `${req.body.user.email} has joined your trip!`,
    text: `Test`,
    replyTo: `${req.body.emailFrom}`
  };
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res);
    }
  });
});

async function getAuthorizedUsers(tripId) {
  //returns an object of user ids for all users authorized to view details of this trip
  try {
    const {users} = await Trip.findById(tripId, {include: [User]});
    const authorized = {};
    users.forEach(user => (authorized[user.id] = true));
    return authorized;
  } catch (err) {
    console.log(err);
  }
}

module.exports = router;
