const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const { db } = require('./models')


const path = require('path')
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, '..', 'public')))
































app.use((req, res, next) => {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  console.error(err)
  if (err.status) {
      res.status(err.status).send()
      //res.sendStatus(err.status)
  } else {
      res.status(500).send()
  }
})


app.listen(3000, () => {
  console.log(`
========================================
LISTENING ON PORT http://localhost:3000
========================================
`)
  db.sync()
    .then(() => {
        console.log("DB IS GREAT")
    })
    .catch(console.error)
})
