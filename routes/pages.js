const express = require('express')
const controller = require('../controllers/pages')

const router = express.Router()

router.get('/', controller.index)
router.get('/about', controller.about)

module.exports = router