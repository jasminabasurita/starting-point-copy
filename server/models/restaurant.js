const Sequelize = require('sequelize')
const db = require('./db')

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    }
  },
}, {
  //for getters, setters, and HOOOOOOOKS!
})

module.exports = Restaurant
