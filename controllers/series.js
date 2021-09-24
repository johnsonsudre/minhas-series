
const labels = [
  { id: 'to-watch', name: 'Para assistir' },
  { id: 'watching', name: 'Estou assistindo' },
  { id: 'watched', name: 'Assisti' },
]

const index = ({ Serie }, req, res) => {
  Serie.find({}, (err, docs) => {
    res.render('series/index', { series: docs, labels })
  })

}

const newProcess = ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  serie.save(() => {
    console.log('saved')
    res.redirect('/series')
  })
}

const newForm = (req, res) => {
  res.render('series/new')
}

const remove = ({ Serie }, req, res) => {
  Serie.deleteOne({
    _id: req.params.id
  }, err => {
    console.log('deleteOne')
    res.redirect('/series')
  })
}

const editForm = ({ Serie }, req, res) => {
  const serie = Serie.findOne({ _id: req.params.id }, (err, serie) => {
    res.render('series/edit', { serie, labels })
  })
}

const editProcess = ({ Serie }, req, res) => {
  Serie.findOne({ _id: req.params.id }, (err, serie) => {
    serie.name = req.body.name
    serie.status = req.body.status
    serie.save()
    res.redirect('/series')
  })
}

module.exports = { index, newProcess, newForm, remove, editForm, editProcess }