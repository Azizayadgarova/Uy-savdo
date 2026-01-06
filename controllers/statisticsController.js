const Property = require('../models/Property')

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Property.countDocuments({ status: { $ne: 'deleted' } })
    const gold = await Property.countDocuments({ type: 'gold', status: 'active' })
    const hidden = await Property.countDocuments({ status: 'hidden' })
    const deleted = await Property.countDocuments({ status: 'deleted' })

    res.json({
      totalProperties: total,
      goldProperties: gold,
      hiddenProperties: hidden,
      deletedProperties: deleted,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
