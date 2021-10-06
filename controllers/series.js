
const labels = [
  { id: 'to-watch', name: 'Para assistir' },
  { id: 'watching', name: 'Estou assistindo' },
  { id: 'watched', name: 'Assisti' },
]

const index = async ({ Serie }, req, res) => {
  const series = await Serie.find({})
  res.render('series/index', { series, labels })
}

const list = async ({ Serie }, req, res) => {
  const series = await Serie.find({})
  res.render('series/list', { series, labels })
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
  res.render('series/new', { errors: [] })
}

const remove = async ({ Serie }, req, res) => {
  await Serie.deleteOne({ _id: req.params.id })
  res.redirect('/series')
}

const removeFromList = async ({ Serie }, req, res) => {
  await Serie.deleteOne({ _id: req.params.id })
  res.redirect('/series/list')
}

const editForm = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/edit', { serie, labels, errors: [] })
}

const editProcess = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.name = req.body.name
  serie.status = req.body.status
  try {
    await serie.save()
    res.redirect('/series')
  } catch (e) {
    res.render('series/edit', { serie, labels, errors: Object.keys(e.errors) })
  }
}

const info = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  res.render('series/info', { serie, labels, errors: [] })
}

const infoProcess = async ({ Serie }, req, res) => {
  await Serie.updateOne({ _id: req.params.id }, {
    $push: { comments: req.body.comment }
  })
  res.redirect('/series/info/' + req.params.id)
}

const removeComment = async ({ Serie }, req, res) => {
  const serie = await Serie.findOne({ _id: req.params.id })
  serie.comments.splice(req.params.index, 1)
  await serie.save()
  res.redirect('/series/info/' + req.params.id)
}

module.exports = { index, list, newProcess, newForm, remove, removeFromList, editForm, editProcess, info, infoProcess, removeComment }