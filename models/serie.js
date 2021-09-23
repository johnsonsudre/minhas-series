const mongoose = require('mongoose')

const serieSchema = mongoose.Schema({
  name: String,
  status: {
    type: String,
    enumValues: ['to-watch', 'watching', 'watched']
  },
  comments: [String]
})

const Serie = mongoose.model('Serie', serieSchema)

module.exports = Serie