// controllers/statisticsController.js
const Property = require('../models/Property')
const Order = require('../models/Order')

exports.getDashboardStats = async (req, res) => {
	try {
		// CARDLAR
		const totalProperties = await Property.countDocuments({
			status: { $ne: 'deleted' },
		})
		const goldProperties = await Property.countDocuments({
			type: 'gold',
			status: 'active',
		})
		const hiddenProperties = await Property.countDocuments({ status: 'hidden' })

		const totalUsers = await Order.distinct('phone') // aktiv foydalanuvchilar

		const totalProfitAgg = await Order.aggregate([
			{ $group: { _id: null, total: { $sum: '$totalPrice' } } },
		])

		const totalProfit = totalProfitAgg[0]?.total || 0

		// OYLIK TO‘LOVLAR
		const paymentsByMonth = await Order.aggregate([
			{
				$group: {
					_id: {
						month: { $month: '$createdAt' },
						type: '$paymentType',
					},
					total: { $sum: '$totalPrice' },
				},
			},
		])

		// OYLIK E’LONLAR
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
				users: totalUsers.length,
				profit: totalProfit,
			},
			paymentsByMonth,
			propertiesByMonth,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
