const router = require ('express').Router();
const {Accommodation} = require('../db/models')
module.exports = router

router.get('/', async(req, res, next) => {
    try{
        const accomodations = await Accommodation.findAll();
        res.json(accomodations);
    } catch(err){
        next(err);
    }

})