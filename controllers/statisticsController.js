const Property = require('../models/Property')
const Order = require('../models/Order')

exports.getDashboardStats = async (req, res) => {
	try {
		// CARDS
		const totalProperties = await Property.countDocuments({
			status: { $ne: 'deleted' },
		})
		const goldProperties = await Property.countDocuments({
			type: 'gold',
			status: 'active',
		})
		const hiddenProperties = await Property.countDocuments({ status: 'hidden' })
		const users = await Order.distinct('customerName')
		const profitAgg = await Order.aggregate([
			{ $group: { _id: null, total: { $sum: '$totalPrice' } } },
		])

		// PAYMENTS BY MONTH
		const paymentsByMonth = await Order.aggregate([
			{
				$group: {
					_id: { month: { $month: '$createdAt' } },
					total: { $sum: '$totalPrice' },
				},
			},
			{ $sort: { '_id.month': 1 } },
		])

		// PROPERTIES BY MONTH
		const propertiesByMonth = await Property.aggregate([
			{
				$group: {
					_id: {
						month: { $month: '$createdAt' },
						type: '$type',
					},
					count: { $sum: 1 },
				},
			},
		])

		res.json({
			cards: {
				totalProperties,
				goldProperties,
				hiddenProperties,
				users: users.length,
				profit: profitAgg[0]?.total || 0,
			},
			paymentsByMonth,
			propertiesByMonth,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
