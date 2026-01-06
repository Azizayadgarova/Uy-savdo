const Property = require('../models/Property')

// CREATE
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body)
    res.status(201).json(property)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// READ (FILTERLI)
exports.getProperties = async (req, res) => {
  try {
    const { status, type } = req.query

    const filter = {}
    if (status) filter.status = status
    if (type) filter.type = type

    const properties = await Property.find(filter).sort({ createdAt: -1 })
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE
exports.updateProperty = async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// GOLDGA O‘TKAZISH
exports.makeGold = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { type: 'gold' },
      { new: true }
    )
    res.json(property)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// BERKITISH
exports.hideProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: 'hidden' },
      { new: true }
    )
    res.json(property)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// SOFT DELETE
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    )
    res.json({ message: 'E’lon o‘chirildi', property })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
