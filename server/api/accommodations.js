const router = require ('express').Router();
const { Accommodation, User } = require('../db/models')
module.exports = router

router.get('/', async(req, res, next) => {
    try{
        const accomodations = await Accommodation.findAll();
        res.json(accomodations);
    } catch(err){
        next(err);
    }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, location, startDate, endDate, tripId } = req.body;
    const newAccomObj = {
      name,
      startDate,
      endDate,
      location,
      tripId
    }
    const newAccommodation = await Accommodation.create(newAccomObj);
    const user = await User.findById(req.user.id);
    user.addAccommodation(newAccommodation);
    res.status(201).send(newAccommodation);
  } catch (error) {
    next(error)
  }
})
