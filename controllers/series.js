const index = ({ Serie }, req, res) => {
  Serie.find({}, (err, docs) => {
    res.render('series/index', { series: docs })
  })

}

const newProcess = ({ Serie }, req, res) => {
  console.log('req.body:', req.body)
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
  console.log('remove')
  console.log('req.params._id', req.params)
  Serie.deleteOne({
    _id: req.params.id
  }, err => {
    console.log('deleteOne')
    res.redirect('/series')
  })
}

module.exports = { index, newProcess, newForm, remove }