const Serie = require('../models/serie')

const index = (req, res) => {
  Serie.find({}, (err, docs) => {
    res.render('series/index', { series: docs })
  })

}
const newSerie = (req, res) => {
  const serie = new Serie({
    name: 'Dark',
    status: 'watched'
  })
  serie.save(() => console.log('saved'))
  res.render('series/newSerie')
}

module.exports = { index, newSerie }