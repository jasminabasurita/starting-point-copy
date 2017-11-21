const Sequelize = require('sequelize')
const db = require('./db')

const Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT,
    validate: {
      min: 1,
      max: 5,
    }
  },
  amenities: {
    type: Sequelize.STRING
  }
}, {
  //for getters, setters, and HOOOOOOOKS!
})

module.exports = Hotel
