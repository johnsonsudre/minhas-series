const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const pageRouter = require('./routes/pages')
const seriesRouter = require('./routes/series')

const port = process.env.PORT || 3000
const mongo = process.env.MONGODB_URI || 'mongodb://localhost/my-series'

// process request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path')

// assets
app.use(express.static(path.join(__dirname, 'public')))
// view engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', pageRouter)
app.use('/series', seriesRouter)

mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log('Listening port ', port)
    })
  })
  .catch(e => console.log("Mongoose connect error: ",e))

  module.exports = app