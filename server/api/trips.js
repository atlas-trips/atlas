const router = require('express').Router();
const {User, Trip, Accommodation, Activity, Transportation} = require('../db/models')

router.get('/', (req, res, next) => {
    res.send("This is the trips route. Hello")
})

router.post('/', async (req, res, next) => {
  try {
    const { name, startDate, endDate } = req.body;
    const newTripObj = {
      name,
      startDate,
      endDate,
    }
    const newTrip = await Trip.create(newTripObj);
    const user = await User.findById(req.user.id);
    user.addTrip(newTrip);
    res.status(201).send(newTrip);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async(req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            res.status(400).send("Bad Request");
        }
        const trip = await Trip.find({where: {id: id}, include: [User, Accommodation, Activity, Transportation]});
        if(!trip){
            res.status(404).send("Not Found")
        }

        const isAuthorized = {}
        trip.users.forEach(user=> isAuthorized[user.id] = true );
        if(req.user && isAuthorized[req.user.id]){
            res.json(trip)
        } else {
            res.status(403).send('Forbidden');
        }
    } catch(err){
        next(err);
    }
})

router.get('/:id/accommodations', async (req, res, next) => {
  try {
    const tripId = req.params.id;
    const accommodations = await Accommodation.findAll({
      where: {
        tripId,
      }
    })
    res.send(accommodations)
  } catch (error) {
    next(error);
  }
})


module.exports = router
