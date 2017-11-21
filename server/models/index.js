const Sequelize = require('sequelize')
const db = require('./db')
const Hotel = require('./hotel')
const Activity = require('./activity')
const Restaurant = require('./restaurant')
const Place = require('./place')

Hotel.belongsTo(Place)
Activity.belongsTo(Place)
Restaurant.belongsTo(Place)

module.exports = {
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant,
  Place: Place,
  db: db
}
