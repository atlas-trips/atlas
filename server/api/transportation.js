const router = require('express').Router();
const {Transportation, Travel, User} = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/:tripId', async (req, res, next) => {
  try {
    const transportation = await Transportation.findAll({
      where: {
        tripId: req.params.tripId
      },
      include: [{model: User}]
    });

    res.json(transportation);
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
    let newTransport = await Travel.findAll({
      where: {
        [Op.and]: [{tripId: req.params.tripId}, {userId: req.params.userId}]
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

module.exports = router;
