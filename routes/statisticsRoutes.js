const express = require('express')
const router = express.Router()
const { getDashboardStats } = require('../controllers/statisticsController')

router.get('/', getDashboardStats)

module.exports = router
