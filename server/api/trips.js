const router = require('express').Router();
const {
  User,
  Trip,
  Accommodation,
  Activity,
  Transportation
} = require('../db/models');
const {cleanUp, makeCalendarArray} = require('./utils');

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

router.get('/:id/activities', async (req, res, next) => {
  try {
    const tripId = Number(req.params.id);
    const isAuthorized = await getAuthorizedUsers(tripId);
    console.log(isAuthorized)
    if(req.user && isAuthorized[req.user.id]){
      const activities = await Activity.findAll({
        where: {
          tripId
        }
      });
      res.send(activities);
    } else {
      res.status(403).send('Forbidden')
    }

  } catch (error) {
    next(error);
  }
});

router.post('/:id/activities', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if(isNaN(id)){
      res.status(400).send('Bad Request');
    }
    const isAuthorized = await getAuthorizedUsers(id);
    if(req.user && isAuthorized[req.user.id]){
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

router.delete('/:id/activities/:actId', async(req, res, next) => {
  try{
    const id = Number(req.params.id);
    const actId = Number(req.params.actId);
    if(isNaN(id) || isNaN(actId)){
      res.status(400).send('Bad Request');
    }
    const isAuthorized = await getAuthorizedUsers(id);
    if(req.user && isAuthorized[req.user.id]){
      //DO STUFF HERE
      let act = await Activity.findById(actId);
      act = await act.destroy();
      res.status(204).send('No Content');

    } else {
      res.status(403).send('Forbidden');
    }
  } catch(err){
    next(err);
  }
})

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
    const isAuthorized =  await getAuthorizedUsers(id)
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
    if(req.user && isAuthorized[req.user.id]){
      const accommodations = await Accommodation.findAll({
        where: {
          tripId
        }
      });
      res.send(accommodations);
    } else {
      res.status(403).send('Forbidden')
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id/all', async (req, res, next) => {
  try {
    const isAuthorized = await getAuthorizedUsers(req.params.id);
    if(req.user && isAuthorized[req.user.id]){
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
      res.status(403).send('Forbidden')
    }
  } catch (error) {
    next(error);
  }
});



async function getAuthorizedUsers(tripId){
  //returns an object of user ids for all users authorized to view details of this trip
  try{
    const {users} = await Trip.findById(tripId, {include: [User]});
    const authorized = {}
    users.forEach(user => authorized[user.id] = true);
    return authorized;
  } catch(err){
    console.log(err);
  }
}

module.exports = router;
