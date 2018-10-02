const router = require('express').Router();
const { Transportation, Travels } = require('../db/models');

router.get('/:tripId', async (req, res, next) => {
  try {
    const travels = await Travels.findAll({
      where: {
        tripId: req.params.tripId
      },
      include: [{ model: Transportation }]
    });
    res.json(travels.transportation);
  } catch (err) {
    next(err);
  }
});

router.post('/:tripId/:userId', async (req, res, next) => {
  try {
    const newTransport = await Transportation.create({
      method: req.body,
      flightNum: req.body.flightNum,
      date: req.body.date
    });
    newTransport.setTrip(req.params.tripId);
    newTransport.setUser(req.params.userId);
    res.json(newTransport);
  } catch (err) {
    next(err);
  }
});

router.put('/:tripId/:userId', async (req, res, next) => {
  try {
    let newTransport = await Travels.findAll({
      where: {
        [$and]: [{ tripId: req.params.tripId }, { userId: req.params.userId }]
      }
    });
    newTransport = newTransport.update({
      method: req.body,
      flightNum: req.body.flightNum,
      date: req.body.date
    });
    res.json(newTransport);
  } catch (err) {
    next(err);
  }
});
