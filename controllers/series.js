
const labels = [
  { id: 'to-watch', name: 'Para assistir' },
  { id: 'watching', name: 'Estou assistindo' },
  { id: 'watched', name: 'Assisti' },
]

const index = async ({ Serie }, req, res) => {
  const series = await Serie.find({})
  res.render('series/index', { series, labels })
}

const newProcess = async ({ Serie }, req, res) => {
  const serie = new Serie(req.body)
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    res.render('series/new', { errors: Object.keys(e.errors) })
  }
}

const newForm = (req, res) => {
  res.render('series/new', { errors: null })
}

const remove = async ({ Serie }, req, res) => {
  await Serie.deleteOne({ _id: req.params.id })
  res.redirect('/series')
}

const editForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/edit', { serie, labels, errors: null })
}

const editProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.name = req.body.name
  serie.status = req.body.status
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    console.log(Object.keys(e.errors))
    res.render('series/edit', { serie, labels, errors: Object.keys(e.errors) })
    //res.render('/series/edit', { serie, labels, errors: Object.keys(e.errors) })
  }
}

module.exports = { index, newProcess, newForm, remove, editForm, editProcess }