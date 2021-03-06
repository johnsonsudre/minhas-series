const express = require('express')
const controller = require('../controllers/series')

const router = express.Router()

const Serie = require('../models/serie')
const models = {
  Serie
}

router.get('/', controller.index.bind(null, models))
router.get('/list', controller.list.bind(null, models))
router.get('/new', controller.newForm)
router.post('/new', controller.newProcess.bind(null, models))
router.get('/remove/:id', controller.remove.bind(null, models))
router.get('/removeFromList/:id', controller.removeFromList.bind(null, models))
router.get('/edit/:id', controller.editForm.bind(null, models))
router.post('/edit/:id', controller.editProcess.bind(null, models))
router.get('/info/:id', controller.info.bind(null, models))
router.post('/info/:id', controller.infoProcess.bind(null, models))
router.get('/info/removeComment/:index/:id', controller.removeComment.bind(null, models))

module.exports = router