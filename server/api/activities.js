const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

// GET api/activities

router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      where: {
        tripId: req.body
      }
    })
    res.json(activities)
  } catch (err) {
    next(err)
  }
})

// POST api/activities/add

router.post('/add', async (req, res, next) => {
  console.log('in the post activities route, body ', req.body)
  try {
    await Activity.create({
      location: req.body.activityLocation,
      name: req.body.activityName,
      description: req.body.description,
      date: req.body.selectedDay
    })
    res.status(201).send()
  } catch (err) {
    next(err)
  }
})
