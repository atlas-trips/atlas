const router = require('express').Router()
const {User, Trip} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) {
      res.status(400).send('Bad Request')
    } else if (req.user && req.user.id === id) {
      const user = await User.findById(id)
      res.json(user)
    } else {
      res.status(403).send('Forbidden')
    }
  } catch (err) {
    next(err)
  }
})


router.get('/:id/trips', async (req, res, next) => {
  try{
    const id = Number(req.params.id);
    if(isNaN(id)){
      res.status(400).send('Bad Request');
    } else if(req.user && req.user.id === id){
      const trips = await User.find({where: {id: id}, include: [Trip]});
      res.json(trips);
    } else {
      res.status(403).send('Forbidden');
    }
  } catch(err){
    next(err);
  }
})