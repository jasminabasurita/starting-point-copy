const express = require('express')
const router = express.Router()
const {Hotel, Activity, Restaurant, Place} = require('../models')

router.get('/attractions', (req, res, next) => {
    const hotelPromise = Hotel.findAll({include:[Place]})
    const activityPromise = Activity.findAll({include:[Place]})
    const restaurantPromise = Restaurant.findAll({include:[Place]})
    Promise.all([hotelPromise, activityPromise, restaurantPromise])
    .then( promArr => {
        const allAttractions = {
            hotels: promArr[0],
            activities: promArr[1],
            restaurants: promArr[2]
        }
        res.json(allAttractions)
    })
    .catch(next)
})


module.exports = router
