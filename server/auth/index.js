const router = require('express').Router();
const User = require('../db/models/user');
const Trip = require('../db/models/trip');
const nodemailer = require('nodemailer');

module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    console.log('from the signup', req.body);
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    console.log('user created is', user);
    const foundTrip = await Trip.findById(req.body.tripId);
    if (foundTrip) {
      foundTrip.addUser(user);
    }
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/refsignup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name
    });
    const users = req.body.trip.users;
    const usersArr = users
      .map(u => {
        return `${u.email}`;
      })
      .toString();

    const foundTrip = await Trip.findById(req.body.trip.id);
    if (foundTrip) {
      foundTrip.addUser(user);
    }
    const transporter = nodemailer.createTransport({
      service: 'yahoo',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });
    const mailOptions = {
      from: 'Atlas Trips' + '<' + process.env.EMAIL + '>',
      to: usersArr,
      subject: `${req.body.name} has joined your trip!`,
      text: `Test`,
      replyTo: process.env.EMAIL
    };
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res);
      }
    });

    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
