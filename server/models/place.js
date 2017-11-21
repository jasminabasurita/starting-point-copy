const Sequelize = require('sequelize')
const db = require('./db')

const Place = db.define('place', {
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
}, {
  //for getters, setters, and HOOOOOOOKS!
})

module.exports = Place
