const router = require('express').Router();
const {User, Trip, Accommodation, Activity, Transportation} = require('../db/models')

router.get('/', (req, res, next) => {
    res.send("This is the trips route. Hello")
})

router.get('/:id', async(req, res, next) => {
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            res.status(400).send("Bad Request");
        }
        const trip = await Trip.find({where: {id: id}, include: [User, Accommodation, Activity, Transportation]});
        if(!trip){
            res.status(404).send("Not Found")
        }
        res.json(trip);
    } catch(err){
        next(err);
    }
})


module.exports = router