const router = require('express').Router();
const {Accommodation, User} = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      location,
      startDate,
      endDate,
      tripId,
      coordinates,
      placeId
    } = req.body;
    const newAccomObj = {
      name,
      startDate,
      endDate,
      location,
      tripId,
      coordinates,
      placeId
    };
    const newAccommodation = await Accommodation.create(newAccomObj);
    const user = await User.findById(req.user.id);
    user.addAccommodation(newAccommodation);
    res.status(201).send(newAccommodation);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const accomId = req.body.id;
    await Accommodation.destroy({
      where: {
        id: accomId
      }
    });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
