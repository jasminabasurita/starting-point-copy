const express = require('express')
const router = express.Router()
const {Hotel, Activity, Restaurant, Place} = require('../models')

router.get('/attractions', (req, res, next) => {

    Promise.all([
        Hotel.findAll({include: [{ all: true }]}),
        Activity.findAll({include: [{ all: true }]}),
        Restaurant.findAll({include: [{ all: true }]})
    ])
    .then( data => {
        res.json({
            hotels: data[0],
            activities: data[1],
            restaurants: data[2]
        })
    })
    .catch(next)
})


module.exports = router
