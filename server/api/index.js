const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/accommodations', require('./accommodations'))
<<<<<<< HEAD
router.use('/activities', require('./activities'))
=======
router.use('/trips', require('./trips'))
>>>>>>> master

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
