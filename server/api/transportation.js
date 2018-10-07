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
      method: req.body.method,
      flightNum: req.body.flightNum,
      date: req.body.date
    });
    const travel = await Travel.create({
      tripId: req.params.tripId,
      transportationId: newTransport.id,
      userId: req.params.userId
    });
    res.json(travel);
  } catch (err) {
    next(err);
  }
});

router.delete('/:tripId/:userId/:transportationId', async (req, res, next) => {
  try {
    await Travel.destroy({
      where: {
        [Op.and]: [
          {tripId: req.params.tripId},
          {userId: req.params.userId},
          {transportationId: req.params.transportationId}
        ]
      }
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
