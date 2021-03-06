const router = require('express').Router();
module.exports = router;
const axios = require('axios');

router.use('/users', require('./users'));
router.use('/accommodations', require('./accommodations'));
router.use('/trips', require('./trips'));
router.use('/transportation', require('./transportation'));

//TODO: get this into the front end so that hopefully google allows it
router.get('/:id', async (req, res, next) => {
  try {
    const {data: place} = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?cid=${
        req.params.id
      }&key=AIzaSyD4jSOU0XG9zooC14hIs9G_zTNkEQ6zd_g`
    );
    res.json(place);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
