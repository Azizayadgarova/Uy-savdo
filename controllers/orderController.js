const Order = require('../models/Order')

// CREATE
// orderController.js, CREATE
exports.createOrder = async (req, res) => {
	try {
		const { status, ...rest } = req.body
		const order = await Order.create({
			...rest,
			status: status ? status.toLowerCase() : undefined, // kichik harfga o'tkazish
		})
		res.status(201).json(order)
	} catch (error) {
		res.status(400).json({ message: error.message, errors: error.errors })
	}
}

// READ (ALL)
exports.getOrders = async (req, res) => {
	try {
		const orders = await Order.find().sort({ createdAt: -1 })
		res.json(orders)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// UPDATE STATUS
exports.updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findByIdAndUpdate(
			req.params.id,
			{ status: req.body.status },
			{ new: true }
		)
		res.json(order)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

// DELETE
exports.deleteOrder = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id)
		res.json({ message: 'Buyurtma o‘chirildi' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
