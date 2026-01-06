const express = require('express')
const router = express.Router()

const {
  createProperty,
  getProperties,
  updateProperty,
  makeGold,
  hideProperty,
  deleteProperty,
} = require('../controllers/propertyController')

router.post('/', createProperty)
router.get('/', getProperties)
router.put('/:id', updateProperty)

router.patch('/:id/gold', makeGold)
router.patch('/:id/hide', hideProperty)
router.delete('/:id', deleteProperty)

module.exports = router
