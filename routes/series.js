const express = require('express')
const controller = require('../controllers/series')

const router = express.Router()

router.get('/', controller.index)
router.get('/newSerie', controller.newSerie)

module.exports = router